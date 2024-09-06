"use strict"

const { convenients } = require("../utilities/constant.util")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Convenients", convenients)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Catalogs", null, {})
  },
}
