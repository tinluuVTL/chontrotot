"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contract.belongsTo(models.User, { foreignKey: "userId", as: "rUser" })
      Contract.belongsTo(models.Room, { foreignKey: "roomId", as: "rRoom" })
    }
  }
  Contract.init(
    {
      userId: DataTypes.INTEGER,
      roomId: DataTypes.INTEGER,
      expiredAt: DataTypes.DATE,
      preMoney: DataTypes.FLOAT,
      notes: DataTypes.STRING,
      stayNumber: DataTypes.INTEGER,
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Contract",
    }
  )
  return Contract
}
