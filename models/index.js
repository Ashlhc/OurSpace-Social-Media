const User = require('./User');
const Post = require('./Post');
const Interest = require('./Interest');
const Comment = require('./Comment');

// One-To-Many from Users [One] --> Posts [Many]
Post.belongsTo(User,{
    onDelete:"CASCADE"
});
User.hasMany(Post);

// One-To-Many from Users [One] --> Interests [Many]
Interest.belongsTo(User,{
    onDelete:"CASCADE"
});
User.hasMany(Interest);

// One-To-Many from Users [One] --> Comments [Many]
Comment.belongsTo(User,{
    onDelete:"CASCADE"
});
User.hasMany(Comment);

// One-To-Many from Posts [One] --> Comments [Many]
Comment.belongsTo(Post,{
    onDelete: "CASCADE"
});
Post.hasMany(Comment);

// Many-To-Many between Users [Many] --> Users [Many]
User.belongsTo(User,{
    through: "friends"
});
User.belongsTo(User,{
    through: "friends"
})

module.exports = {
    User:User,
    Post:Post,
    // Friend:Friend,
    Interest:Interest,
    Comment:Comment
}