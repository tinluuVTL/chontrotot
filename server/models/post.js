"use strict"
const { Model } = require("sequelize")
const { v4 } = require("uuid")
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Catalog, {
        foreignKey: "catalogId",
        as: "rCatalog",
      })
      Post.hasMany(models.Room, {
        foreignKey: "postId",
        as: "rRooms",
      })
      Post.belongsTo(models.User, { foreignKey: "postedBy", as: "rUser" })
      Post.hasMany(models.Rating, { foreignKey: "postId", as: "rRating" })
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      star: DataTypes.FLOAT,
      address: DataTypes.STRING,
      catalogId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      postedBy: DataTypes.INTEGER,
      images: {
        type: DataTypes.TEXT,
        get() {
          const raw = this.getDataValue("images")
          return raw ? JSON.parse(raw) : []
        },
        set(value) {
          return this.setDataValue("images", JSON.stringify(value))
        },
      },
      isDeleted: DataTypes.BOOLEAN,
      views: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  )
  return Post
}
