const database = require('../database/DbModule.js');

async function createData(table, data){
    try {
        await database[table].create(data);
    } catch (e) {
        throw e;
    }
}

async function updateData(table, whereObject, modifs){
    try {
        await database[table].update(modifs, {where: whereObject,});
    } catch (e) {
        throw e;
    }
}

async function destroyData(table, whereObject){
    try {
        await database[table].destroy({where: whereObject});
    } catch (e){
        throw (e);
    }
}

async function getDataByVar(table, whereObject){
    try {
        let data = await database[table].findAll({where : whereObject});
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
            }
        });
        return list;
    } catch (e) {
        throw e;
    }
}

//database.initDatabase();

async function testmyDb() {
    //console.log(await getTableVars('drug', 'id', 'type', 'soft'));
    console.log(await getDataByVar('drug',{id: '9f3d0522-f514-4e3a-8fc2-2f343ed746e6'}));
    // ** Show database
    await database.drug.findAll()
        .then(data => console.log(JSON.stringify(data, null, 4)))
        .catch(e => console.log(e));
}

//testmyDb();

module.exports = { createData, updateData, destroyData, getDataByVar, getTableVars, database, };
