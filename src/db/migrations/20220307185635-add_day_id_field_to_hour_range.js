'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('HourRanges', 'dayId', {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      references: {
        model: 'Days',
        key: 'id',
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('HourRanges', 'dayId');
  },
};
