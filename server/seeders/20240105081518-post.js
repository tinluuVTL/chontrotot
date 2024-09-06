"use strict"

const { posts } = require("../utilities/constant.util")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Posts", posts)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Posts", null, {})
  },
}
