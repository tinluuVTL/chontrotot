"use strict"

const { rooms } = require("../utilities/constant.util")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Rooms", rooms)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Rooms", null, {})
  },
}
