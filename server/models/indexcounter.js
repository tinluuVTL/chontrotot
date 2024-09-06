"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class IndexCounter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  IndexCounter.init(
    {
      roomId: DataTypes.FLOAT,
      electric: DataTypes.FLOAT,
      water: DataTypes.FLOAT,
      caps: DataTypes.BOOLEAN,
      internet: DataTypes.BOOLEAN,
      date: DataTypes.DATE,
      isPayment: DataTypes.BOOLEAN,
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "IndexCounter",
    }
  )
  return IndexCounter
}
