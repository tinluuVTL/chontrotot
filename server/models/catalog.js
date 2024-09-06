"use strict"
const { Model } = require("sequelize")
const slugify = require("slugify")
const { v4 } = require("uuid")
module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Catalog.init(
    {
      slug: {
        type: DataTypes.STRING,
        set(value) {
          return this.setDataValue("slug", slugify(value).toLowerCase())
        },
      },
      text: DataTypes.STRING,
      description: DataTypes.TEXT,
      value: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Catalog",
    }
  )

  return Catalog
}
