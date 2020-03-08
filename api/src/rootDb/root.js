#!/usr/bin/env node
/*
** PROJECT DRUSEFUL, 2020
** javascript
** File description:
** root de la db
*/
// ! Include and lib
const express = require('express');

const Joi = require('joi');

const app = express();

const argon2 = require('argon2');

const bodyParser = require('body-parser');

const session = require('express-session');

const cookieParser = require('cookie-parser');

const lib = require('../databaseFunctions/data');

const FileStore = require('session-file-store')(session);
//const database = require('../database/DbModule.js');

// use and env
app.use(bodyParser.json());
app.use(session({
    secret: "Your secret key",
    resave: true,
    saveUninitialized: false,
    store: new FileStore({path: './sessions'})
}));

// Joi schema and function
const newUser1Schema = Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().required(),
});

const newUser2Schema = Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().required(),
    confPassword: Joi.string().required(),
});

const newIdSchema = Joi.object().keys({
    userId: Joi.string().required(),
    cookie: Joi.object().required(),
    __lastAccess: Joi.number().optional(),
});

const newBodySchema = Joi.object().keys({
    drugId: Joi.string().required(),
});

const newIdEffectSchema = Joi.object().keys({
    type: Joi.string().required(),
});

const isValid = (schema, location = 'body') => async (req, res, next) => {
    const {error, value} = Joi.validate(req[location], schema);

    if (error) {
        console.error(error);
        res.status(400);
        return res.send("Cannot logged you in").end();
    }
    next();
};

const isLogin = (schema, location = 'session') => async (req, res, next) => {
    const {error, value} = Joi.validate(req[location], schema);

    if (error) {
        console.error(error);
        res.status(400);
        return res.send("Not logged in").end();
    }
    next();
};

async function rootBase() {
    try {
        app.get('/DrUseful', async (req, res) => {
            // on the main page
            res.send("home page");
        });
        app.get('/DrUseful/logout', function(req, res, next) {
            if (req.session) {
                req.session.destroy(function(err) {
                    if(err) {
                        return next(err);
                    } else {
                        console.log("You are now logged out");
                        return res.redirect('/DrUseful');
                    }
                });
            }
        });
        app.post('/DrUseful/login', isValid(newUser1Schema), async (req, res) => {
            // body login and password (hash) return the user
            let db = await lib.database.user.findAll();
            db.filter(function (user) {
                if (user.username === req.body.login) {
                    req.session.userId = user.id;
                    db = user;
                }
            });
            let hash;
            if (await argon2.verify(db.password, req.body.password)) {
                req.session.userId = db.id;
                res.send("You are logged in");
            } else {
                req.session.userId = 0;
                res.send("Bad username or bad password");
            }
        });
        app.post('/DrUseful/register', isValid(newUser2Schema), async (req, res) => {
            // body login and username
            let log = req.body.login;
            let conPwd = req.body.confPassword;
            if (conPwd !== req.body.password) {
                req.status = 400;
                res.send("This is not the same password");
            }
            let hash = await argon2.hash(req.body.password);
            await lib.createData('user', {username: log, password: hash, perm: 'user'});
            const re = await lib.getTableVars('user', 'id', 'username', log);
            req.session.userId = re[0];
            res.send("Your account has created\nWelcome " + log + " !");
        });
        app.get('/DrUseful/me', isLogin(newIdSchema), async (req, res) => {
            // return the user logged in
            const re = await lib.getDataByVar('user', {id: req.session.userId});
            console.log(re);
            res.send(re);
        });
        app.get('/DrUseful/drug', async (req, res) => {
            // return an array of drug
            let re = await lib.database.drug.findAll();
            re = JSON.stringify(re, null, 4);
            console.log(re);
            res.send(re);
        });
        app.get('/DrUseful/drug/:id', async (req, res) => {
            // return a specific drug with the id
            let re = await lib.getDataByVar('drug', {name: req.params.id});
            res.send(re);
        });
        app.get('/DrUseful/effect', async (req, res) => {
            // returns an array of effect
            let re = await lib.database.effect.findAll();
            console.log(JSON.stringify(re, null, 4));
            res.send(re);
        });
        app.get('/DrUseful/effect/:id', async (req, res) => {
            // return a specific effect with the id
            let re = await lib.getDataByVar('effect', {type: req.params.id});
            res.send(re);
        });
        // the user must be logged in
        app.get('/DrUseful/me/favorite', isLogin(newIdSchema), async (req, res) => {
            // return the user.favorite
            let re = await lib.getDataByVar('userDrugFav', {userId: req.session.userId});
            console.log(re);
            res.send(re);
        });
        app.post('/DrUseful/me/favorite/add', isLogin(newIdSchema), isValid(newBodySchema), async (req, res) => {
            // body drugID
            let dr = await lib.getTableVars('drug','id','name',req.body.drugId);
            await lib.createData('userDrugFav',{drogueId: dr[0], userId: req.session.userId});
            res.send("You have correctly added a new favorite drug");
        });
        app.delete('/DrUseful/me/favorite/delete', isLogin(newIdSchema), isValid(newBodySchema), async (req, res) => {
            // body drugID
            let dr = await lib.getTableVars('drug','id','name',req.body.drugId);
            await lib.destroyData('userDrugFav',{drogueId: dr[0], userId: req.session.userId});
            res.send("in the delete favorite page of the user");

        });
        app.post('/DrUseful/me/bio', /*isLogin(newIdSchema), */async (req, res) => {
            // body bio, modify the biography of the user
            const bio = req.body.bio;
            await lib.updateData('user',{id: req.session.userId}, {bio: bio});
            res.send("in bio page of the logged in user")
        });
        app.use('*', (req, res) => {
            res.status(404);
            res.send("Error 404 buddy").end();
        });
    } catch (e) {
        console.error(e);
    } finally {
        console.log("All good");
    }
    app.listen(9000);
}

async function main() {
    await rootBase();
}

main().then(e => e);
