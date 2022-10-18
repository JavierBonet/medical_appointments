'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.changeColumn('Appointments', 'date', {
      type: Sequelize.DataTypes.STRING,
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.changeColumn('Appointments', 'date', {
      type: Sequelize.DataTypes.DATE,
    });
  },
};
