"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("IndexCounters", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      roomId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      electric: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      water: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      caps: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      internet: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("IndexCounters")
  },
}
