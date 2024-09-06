"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      star: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      catalogId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      postedBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      images: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Posts")
  },
}
