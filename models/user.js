'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define the association here
      User.hasMany(models.LikesBy, {
        foreignKey: 'userId',
      });

      User.hasMany(models.CommentsBy, {
        foreignKey: 'userId',
      });
      User.hasMany(models.Posts, {
        foreignKey: 'userId',
      });
    }
  }

  User.init({
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    dob: DataTypes.DATE,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
