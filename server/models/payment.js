"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.User, { foreignKey: "userId", as: "rUser" })
      Payment.belongsTo(models.Room, { foreignKey: "roomId", as: "rRoom" })
    }
  }
  Payment.init(
    {
      userId: DataTypes.INTEGER,
      email: DataTypes.STRING,
      roomId: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM,
        values: ["Thành công", "Đang chờ", "Đã hủy"],
      },
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  )
  return Payment
}
