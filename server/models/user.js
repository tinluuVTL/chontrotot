"use strict"
const { Model } = require("sequelize")
const bcrypt = require("bcrypt")

const hashPassword = (password) => bcrypt.hashSync(password, 10)
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile, { foreignKey: "userId", as: "rprofile" })
      User.hasMany(models.Role_User, { foreignKey: "userId", as: "rroles" })
      User.hasMany(models.Contract, { foreignKey: "userId", as: "rContracts" })
    }
  }
  User.init(
    {
      phone: DataTypes.STRING,
      username: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("password", hashPassword(value))
        },
      },
      resetTokenPassword: DataTypes.STRING,
      resetTokenExpire: DataTypes.DATE,
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  )

  return User
}
