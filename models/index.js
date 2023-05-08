const User = require('./User');
const Post = require('./Post');
// const Friend = require('./friends');
const Interest = require('./Interest');
const Comment = require('./Comment');

Post.belongsTo(User,{
    onDelete:"CASCADE"
});
// Friend.belongsTo(User,{
//     onDelete:"CASCADE"
// });
Interest.belongsTo(User,{
    onDelete:"CASCADE"
});
Comment.belongsTo(User,{
    onDelete:"CASCADE"
});
User.hasMany(Post);
User.hasMany(Friend);
User.hasMany(Interest);
User.hasMany(Comment);

module.exports = {
    User:User,
    Post:Post,
    // Friend:Friend,
    Interest:Interest,
    Comment:Comment

}
