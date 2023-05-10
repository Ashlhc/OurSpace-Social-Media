const User = require('./User');
const Post = require('./Post');
const Interest = require('./Interest');
const Comment = require('./Comment');

// One-To-Many from Users [One] --> Posts [Many]
Post.belongsTo(User,{
    foreignKey: {
        allowNull: false
    },
    onDelete:"CASCADE"
});
User.hasMany(Post,{
    foreignKey: {
        allowNull: false
    },
    onDelete: "CASCADE"
});

// One-To-Many from Users [One] --> Interests [Many]
Interest.belongsTo(User,{
    foreignKey: {
        allowNull: false
    },
    onDelete:"CASCADE"
});
User.hasMany(Interest,{
    foreignKey: {
        allowNull: false
    },
    onDelete: "CASCADE"
});

// One-To-Many from Users [One] --> Comments [Many]
Comment.belongsTo(User,{
    foreignKey: {
        allowNull: false
    },
    onDelete:"CASCADE"
});
User.hasMany(Comment,{
    foreignKey: {
        allowNull: false
    },
    onDelete: "CASCADE"
});

// One-To-Many from Posts [One] --> Comments [Many]
Comment.belongsTo(Post,{
    foreignKey: {
        allowNull: false
    },
    onDelete: "CASCADE"
});
Post.hasMany(Comment,{
    foreignKey: {
        allowNull: false
    },
    onDelete: "CASCADE"
});

// Many-To-Many between Users [Many] --> Users [Many]
User.belongsToMany(User,{
    as: "Friends",
    through: "UserFriends"
});

module.exports = {
    User:User,
    Post:Post,
    Interest:Interest,
    Comment:Comment
}