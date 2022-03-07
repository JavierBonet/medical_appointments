'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Days', 'calendarId', {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      references: {
        model: 'Calendars',
        key: 'id',
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Days', 'calendarId');
  },
};
