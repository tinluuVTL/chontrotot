"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Convenient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Convenient.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Convenient",
    }
  )
  return Convenient
}
