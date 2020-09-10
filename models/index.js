const User = require('./User');
const Post = require('./post');
const Comment = require('./comment');



// associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});
Post.belongsTo(User, {
    foreignKey: 'user_id'
});
Comment.belongsTo(User, {
    foreignKey: 'user_id'

});
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});
User.hasMany(Comment);
Post.hasMany(Comment);



module.exports = { User, Post, Comment };
