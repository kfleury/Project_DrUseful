#!/usr/bin/env node
/*
** PROJECT DRUSEFUL, 2020
** javascript
** File description:
** root de la db
*/
// include and lib
const express = require('express');

const Joi = require('joi');

const app = express();

const argon2 = require('argon2');

const bodyParser = require('body-parser');

const session = require('express-session');

const cookieParser = require('cookie-parser');

const lib = require('../databaseFunctions/data');

//const database = require('../database/DbModule.js');

// use and env
app.use(bodyParser.json());
app.use(session({secret: "Your secret key", resave: true, saveUninitialized: false}));

// Joi schema and function
const newUserSchema = Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().required(),
});

const newIdSchema = Joi.object().keys({
    userId: Joi.string().required(),
    cookie: Joi.object().required(),
});

const newBodySchema = Joi.object().keys({
    drogueID: Joi.string().required(),
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
            res.send("home page ");
        });
        app.post('/DrUseful/login', isValid(newUserSchema), async (req, res) => {
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
        app.post('/DrUseful/register', isValid(newUserSchema), async (req, res) => {
            // body login and username
            let log = req.body.login;
            let hash = await argon2.hash(req.body.password);
            await lib.createData('user', {username: log, password: hash, perm: 'user'});
            const re = await lib.getTableVars('user', 'id', 'username', log);
            req.session.userId = re[0];
            res.send("Your account has created\nWelcome " + log + " !");
        });
        app.get('/DrUseful/me', isLogin(newIdSchema), async (req, res) => {
            // return the user logged in
            res.send("in me page");
        });
        app.get('/DrUseful/drugs', async (req, res) => {
            // return an array of drugs
            res.send("in drugs page");
        });
        app.get('/DrUseful/drugs/:id', isValid(newIdSchema, 'params'), async (req, res) => {
            // return a specific drug with the id
            res.send("in a specific drugs page");
        });
        app.get('/DrUseful/effects', async (req, res) => {
            // returns an array of effects
            res.send("in effects page");
        });
        app.get('/DrUseful/effects/:id', isValid(newIdSchema, 'params'), async (req, res) => {
            // return a specific effect with the id
            res.send("in a specific effects page");
        });
        // the user must be logged in
        app.get('/DrUseful/me/favorite', isLogin(newIdSchema), async (req, res) => {
            // return the user.favorite
            res.send("in the favorite page");
        });
        app.post('/DrUseful/me/favorite/add', isLogin(newIdSchema), isValid(newBodySchema), async (req, res) => {
            // body drugID
            res.send("in the add favorite page of the user");
        });
        app.delete('/DrUseful/me/favorite/delete', isLogin(newIdSchema), isValid(newBodySchema), async (req, res) => {
            // body drugID
            res.send("in the delete favorite page of the user");
        });
        app.post('/DrUseful/me/bio', isLogin(newIdSchema), async (req, res) => {
            // body bio, modify the biography of the user
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
    app.listen(8080);
}

async function main() {
    await rootBase();
}

main().then(e => e);
