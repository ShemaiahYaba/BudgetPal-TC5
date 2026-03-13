'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.addColumn('users', 'refresh_token', {
      type: DataTypes.STRING(255),
      allowNull: true,
    });
    await queryInterface.addColumn('users', 'refresh_expires', {
      type: DataTypes.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'refresh_token');
    await queryInterface.removeColumn('users', 'refresh_expires');
  },
};
