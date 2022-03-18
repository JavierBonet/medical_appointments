'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('DoctorHospitals', {
      doctorId: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
          model: 'Doctors',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      hospitalId: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
          model: 'Hospitals',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('DoctorHospitals');
  },
};
