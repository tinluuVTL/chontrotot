"use strict"

const { room_convenients } = require("../utilities/constant.util")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Room_Convenients", room_convenients)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Room_Convenients", null, {})
  },
}
