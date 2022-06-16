'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Appointments', 'patientId', {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      references: {
        model: 'Patients',
        key: 'id',
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Appointments', 'patientId');
  },
};
