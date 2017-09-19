'use strict';
module.exports = function(sequelize, DataTypes) {
  var posts = sequelize.define('posts', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {})

      posts.associate = function(models) {
        posts.hasMany(models.likes,{as: 'likes', foreignKey: 'postId'})
    }

      // posts.associate = function(models) {
      //   posts.belongsTo(models.users, {through: 'likedUsers', foreignKey: 'userId'})
      // }

  return posts;
};
