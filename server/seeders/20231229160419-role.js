"use strict"

const { allRoles } = require("../utilities/constant.util")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Roles", allRoles)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Roles", null, {})
  },
}
