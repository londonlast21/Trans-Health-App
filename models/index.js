const User = require('./User');

const Post = require('./post');

const Comment = require('./comment');

// associations
User.hasMany(Post, {
    foreignKey: 'username'
});

Post.belongsTo(User, {
    foreignKey: 'username'
});

Comment.belongsTo(User, {
    foreignKey: 'username'
});
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});
User.hasMany(Comment, {
    foreignKey: 'username'
});
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});



module.exports = { User, Post, Comment };
