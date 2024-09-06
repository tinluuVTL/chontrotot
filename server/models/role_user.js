"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Role_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role_User.belongsTo(models.Role, {
        foreignKey: "roleCode",
        as: "roleValues",
        targetKey: "code",
      })
    }
  }
  Role_User.init(
    {
      userId: DataTypes.INTEGER,
      roleCode: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Role_User",
    }
  )
  return Role_User
}
