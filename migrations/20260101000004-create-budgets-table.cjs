'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('budgets', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      month: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      year: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      limit_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addIndex('budgets', ['user_id', 'category_id', 'month', 'year'], {
      unique: true,
      name: 'unique_budget',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('budgets');
  },
};
