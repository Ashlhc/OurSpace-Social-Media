const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {}

User.init({
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
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
        allowNull: false,
        validate:{
            len:[8]
        }
    },
    profile_img: {
        type: DataTypes.STRING,
        defaultValue: 'http://placekitten.com/200/300'
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