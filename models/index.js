const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post);
User.hasMany(Comment);

Post.belongsToMany(User, { through: 'user_posts' });
Comment.belongsToMany(User, { through: 'user_comments' });

module.exports = { User, Post, Comment };