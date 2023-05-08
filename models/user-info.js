const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql2'
    }
);

sequelize.authenticate().then(()=>{
    console.log('Connection successful.');
}).catch((error)=>{
    console.log('Unable to connect to database:',error);
});

const User = sequelize.define('users', {
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profile_img: {
        type: DataTypes.STRING,
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    }

});

sequelize.sync().then(()=>{
    console.log('User table created');
}).catch((error)=>{
    console.log('Unable to create table:',error);
});