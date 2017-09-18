'use strict';
module.exports = function(sequelize, DataTypes) {
  var likes = sequelize.define('likes', {
    likeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {})

    // likes.associate = function (models) {
    //   likes.belongsTo(models.users,{as: 'likedUser', foreignKey: 'userId'})
    // }

  return likes;
};
