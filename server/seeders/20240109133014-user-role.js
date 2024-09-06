"use strict"

const { user_role } = require("../utilities/constant.util")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Role_Users", user_role)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Role_Users", null, {})
  },
}
