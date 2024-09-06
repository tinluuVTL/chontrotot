"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Profile.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      CID: DataTypes.STRING,
      address: DataTypes.STRING,
      birthday: DataTypes.DATE,
      gender: {
        type: DataTypes.ENUM,
        values: ["Nam", "Nữ", "Khác"],
      },
      email: DataTypes.STRING,
      image: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Profile",
    }
  )
  return Profile
}
