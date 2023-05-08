const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Post extends Model {}



Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    author_id: {
        type:DataTypes.INTEGER,
        allowNull: false
    },
    timestamp: {
        type:DataTypes.DATE,
        allowNull: false
    },
},{
    sequelize,
    hooks:{
        beforeCreate: postObj=>{
            console.log(postObj)
            postObj.password = bcrypt.hashSync(postObj.password,3);
            return postObj;
        }
    }
});

module.exports=Post

