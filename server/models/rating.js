"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rating.belongsTo(models.User, {
        foreignKey: "userId",
        as: "rVoter",
      })
    }
  }
  Rating.init(
    {
      postId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      score: DataTypes.FLOAT,
      userId: DataTypes.INTEGER,
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Rating",
    }
  )
  return Rating
}
