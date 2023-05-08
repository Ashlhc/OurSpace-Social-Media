const {Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
    text: {
        type:Datatypes.TEXT,
        
    }
})