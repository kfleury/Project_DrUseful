const database = require('../database/DbModule.js');

async function createData(table, data){
    try {
        await database[table].create(data);
    } catch (e) {
        throw e;
    }
}

async function updateData(table, name, modifs){
    try {
        await database[table].update(modifs, {
            where: {name},
        });
    } catch (e) {
        throw e;
    }
}
async function destroyData(table, name){
    try {
        await database[table].destroy({
            where:
                {name}
        });
    } catch (e){
        throw (e);
    }
}

async function getData_ID(table, id){
    try {
        let data = await database[table].findAll({where : {id}});
        if (data.length === 0)
            throw ('Wrong ID');
        console.log(data[0].dataValues);
        return data[0].dataValues;
    } catch (e){
        throw e;
    }
}

async function getData_Name(table, name){
    try {
        let data = await database[table].findAll({where : {name}});
        if (data.length === 0)
            throw ('Wrong name');
        return data[0].dataValues;
    } catch (e){
        throw e;
    }
}

async function getTableVars(table, variable, varCheck, valCheck){
    try {
        let db = await database[table].findAll();
        let list = [];
        let i = 0;
        let noVarCheck = (!varCheck && !valCheck);

        if (varCheck && !valCheck)
            throw 'Enter a val to check';
        db.forEach(elem => {
            if (noVarCheck === true || elem.dataValues[varCheck] === valCheck) {
                list[i] = elem.dataValues[variable];
                i++;
            }});
        return list;
    } catch (e) {
        throw e;
    }
}

async function testmyDb() {
    await database.initDatabase();

    // ** Show database
    console.log(await getTableVars('drug', 'name', 'type', 'soft'));
    await getData_ID('drug', '9f3d0522-f514-4e3a-8fc2-2f343ed746e6');
    await database.drug.findAll()
        .then(data => console.log(JSON.stringify(data, null, 4)))
        .catch(e => console.log(e));
}

testmyDb();

module.exports = { createData, updateData, destroyData, getData_ID, getData_Name, getTableVars};