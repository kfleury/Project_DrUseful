const {Sequelize, DataTypes} = require('sequelize');
const seq = new Sequelize({
    dialect: 'sqlite',
    host: 'database.sqlite'
});

// ! Creation of drug Model in DB
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

// ! Creation of user model in DB
const user = seq.define('user', {
    id: {
        type: DataTypes.UUIDV4,
        allowNull: true,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    perm: {
        type: DataTypes.ENUM(['admin', 'user']),
        allowNull: false
    }
});

// ! Creation of effect model in DB
const effect = seq.define('effect', {
    id: {
        type: DataTypes.UUIDV4,
        allowNull: true,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false
    },
    strength: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM(['chill', 'excitement', 'hallucination', 'euphoria']),
        allowNull: false
    }
});

// ! Creation of drugEffect associative model in DB
const drugEffect = seq.define('drugEffect', {
    drogueId: {
        type: DataTypes.UUIDV4,
        unique: true,
        foreignKey: 'drug'
    },
    userId: {
        type: DataTypes.UUIDV4,
        unique: true,
        foreignKey: 'user'
    },

});

// ! Creation of userDrogueFav associative model in DB
const userDrogueFav = seq.define('userDrogueFav', {
    drogueId: {
        type: DataTypes.UUIDV4,
        unique: true,
        foreignKey: 'drug'
    },
    userId: {
        type: DataTypes.UUIDV4,
        unique: true,
        foreignKey: 'user'
    },

});

async function initDatabase() {
    await seq.sync();
    console.log('Server Load');
}

// ! Export
module.exports = {
    initDatabase, drug, user, effect, userDrogueFav, drugEffect,
};