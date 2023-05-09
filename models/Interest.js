const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Interest extends Model {}

Interest.init({

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    interest_id: {
        type:DataTypes.INTEGER,
        allowNull: false
    },
},{
    sequelize
});

module.exports = Interest