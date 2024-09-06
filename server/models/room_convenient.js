"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Room_Convenient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room_Convenient.belongsTo(models.Convenient, {
        foreignKey: "convenientId",
        as: "rValues",
      })
    }
  }
  Room_Convenient.init(
    {
      roomId: DataTypes.INTEGER,
      convenientId: DataTypes.INTEGER,
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Room_Convenient",
    }
  )
  return Room_Convenient
}
