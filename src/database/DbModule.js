const {Sequelize, Datatypes} = require('sequelize');

// ? List of content
const texts = [
    'description',
    'story',
    'usage',
    'danger',
];

// ? Affect attributes to texts and put it in model drugInfo
texts.forEach(text => {
    drugModel[text] = {
        type: Datatypes.STRING,
        allowNull: false
    };
});

// ? Content of drug model
const drugModel = {
    id: {
        type: Datatypes.UUID,
        allowNull: true,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    type: Datatypes.ENUM('soft, hard')
};

const drug = seq.define('user', drugModel);

async function initDatabase() {
    await seq.sync();
    console.log('Server Load');
}

// ! Export
module.exports = {
    initDatabase, drug,
};

