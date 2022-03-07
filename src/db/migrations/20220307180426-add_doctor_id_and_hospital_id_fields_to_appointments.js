'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Appointments', 'doctorId', {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        references: {
          model: 'Doctors',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
      queryInterface.addColumn('Appointments', 'hospitalId', {
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
      queryInterface.removeColumn('Appointments', 'doctorId'),
      queryInterface.removeColumn('Appointments', 'hospitalId'),
    ]);
  },
};
