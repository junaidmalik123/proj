'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Posts.hasMany(models.LikesBy, {
        foreignKey: 'postId',
      });

      Posts.hasMany(models.CommentsBy, {
        foreignKey: 'postId',
      });
    }
  }
  Posts.init({
    UserId: DataTypes.STRING,
    post_type: DataTypes.STRING,
    title: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};