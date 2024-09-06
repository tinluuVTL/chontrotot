"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.hasMany(models.Room_Convenient, {
        foreignKey: "roomId",
        as: "rConvenients",
      })
      Room.belongsTo(models.Post, {
        foreignKey: "postId",
        as: "rPost",
      })
      Room.hasMany(models.Payment, { foreignKey: "roomId", as: "rPayment" })
      Room.hasMany(models.IndexCounter, {
        foreignKey: "roomId",
        as: "rCounter",
      })
      Room.hasMany(models.Contract, { foreignKey: "roomId", as: "rContract" })
    }
  }
  Room.init(
    {
      postId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      price: DataTypes.FLOAT,
      area: DataTypes.FLOAT,
      stayMax: DataTypes.INTEGER,
      electricPrice: DataTypes.INTEGER,
      waterPrice: DataTypes.INTEGER,
      capsPrice: DataTypes.INTEGER,
      internetPrice: DataTypes.INTEGER,
      position: {
        type: DataTypes.ENUM,
        values: ["Đã thuê", "Còn trống", "Đang xử lý"],
      },
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Room",
    }
  )
  return Room
}
