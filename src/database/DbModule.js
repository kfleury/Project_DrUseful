const {Sequelize, DataTypes} = require('sequelize');
const seq = new Sequelize({
    dialect: 'sqlite',
    host: 'database.sqlite'
});

// ? List of content
const texts = [
    'description',
    'story',
    'usage',
    'danger',
];

// ? Content of drug model
const drugModel = {
    id: {
        type: DataTypes.UUIDV4,
        allowNull: true,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: DataTypes.ENUM(['soft', 'hard'])
};

// ? Affect attributes to texts and put it in model drugInfo
texts.forEach(text => {
    drugModel[text] = {
        type: DataTypes.STRING,
        allowNull: true
    };
});

const drug = seq.define('drug', drugModel);

async function initDatabase() {
    await seq.sync();
    console.log('Server Load');
}

async function testmyDb() {
    await initDatabase();
    await drug.create({
        name: 'Cocaine',
        description: 'test',
        usage: 'con',
        danger: 'danger',
        type: 'hard'})
        .then(e => console.log('test'))
        .catch(e => console.log(e));
    await drug.findAll()
        .then(data => console.log(JSON.stringify(data, null, 4)))
        .catch(e => console.log(e));
}

testmyDb();
// ! Export
module.exports = {
    initDatabase, drug,
};

