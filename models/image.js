'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.User);
    }
  }
  Image.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      source: {
        type: DataTypes.STRING,
      },
      UserId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Image',
    }
  );
  return Image;
};
