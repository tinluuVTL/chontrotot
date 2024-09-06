"use strict"

const { catalogs } = require("../utilities/constant.util")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Catalogs", catalogs)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Catalogs", null, {})
  },
}
