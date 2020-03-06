const database = require('../database/DbModule.js');

async function createDrug(name, type, description, story, usage, danger){
    try {
        await database.drug.create({
            name,
            description,
            story,
            usage,
            danger
        });
    } catch (e) {
        console.log(e);
    }
}

async function updateDrug(name, modifs){
    try {
        await database.drug.update(modifs, {
            where: {name},
        });
    } catch (e) {
        console.log(e);
    }
}

async function destroyDrug(name){
    try {
        await database.drug.destroy({
            where:
                {name:name}
        });
    } catch (e){
        console.log(e);
    }
}

async function testmyDb() {
    await database.initDatabase();

    await updateDrug('Cocaina', {name: 'Cocaine'});

    // ** Show database
    await database.drug.findAll()
        .then(data => console.log(JSON.stringify(data, null, 4)))
        .catch(e => console.log(e));
}

testmyDb();
module.exports = { destroyDrug, createDrug, updateDrug};