module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("IndexCounters", "isPayment", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("IndexCounters", "isPayment")
  },
}
