"use strict"

const { users } = require("../utilities/constant.util")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", users)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {})
  },
}
