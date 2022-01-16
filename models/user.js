'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Image);
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  User.beforeCreate('hash password', async (user, options) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  User.afterCreate('delete password', (user, options) => {
    delete user.dataValues.password;
  });

  return User;
};
