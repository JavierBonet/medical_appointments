'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Calendars', 'doctorId', {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        references: {
          model: 'Doctors',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
      queryInterface.addColumn('Calendars', 'hospitalId', {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        references: {
          model: 'Hospitals',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Calendars', 'doctorId'),
      queryInterface.removeColumn('Calendars', 'hospitalId'),
    ]);
  },
};
