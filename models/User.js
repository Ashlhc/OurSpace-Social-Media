const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init({

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
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
        defaultValue: 'http://placekitten.com/300'
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    }

},{
    sequelize,
    hooks:{
        beforeCreate: userObj=>{
        userObj.password = bcrypt.hashSync(userObj.password,4);
        return userObj;
        }
    }
});

module.exports = User;