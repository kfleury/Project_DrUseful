const database = require('../database/DbModule.js');

async function createEffect(duration, strength, type){
    try {
        await database.drug.create({
            duration,
            strength,
            type,
        });
    } catch (e) {
        console.log(e);
    }
}

async function updateEffect(name, modifs){
    try {
        await database.effect.update(modifs, {
            where: {name},
        });
    } catch (e) {
        console.log(e);
    }
}
async function destroyEffect(name){
    try {
        await database.effect.destroy({
            where:
                {name:name}
        });
    } catch (e){
        console.log(e);
    }
}

