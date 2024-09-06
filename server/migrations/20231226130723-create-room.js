"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Rooms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Posts",
          key: "id",
        },
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      area: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      stayMax: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      position: {
        type: Sequelize.ENUM(["Đã thuê", "Còn trống", "Đang xử lý"]),
        defaultValue: "Còn trống",
      },
      electricPrice: {
        type: Sequelize.STRING,
        defaultValue: 0,
      },
      waterPrice: {
        type: Sequelize.STRING,
        defaultValue: 0,
      },
      capsPrice: {
        type: Sequelize.STRING,
        defaultValue: 0,
      },
      internetPrice: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Rooms")
  },
}
