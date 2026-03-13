import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Budget = sequelize.define(
    'Budget',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
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
    },
    {
      underscored: true,
      timestamps: true,
      tableName: 'budgets',
      indexes: [
        {
          unique: true,
          fields: ['user_id', 'category_id', 'month', 'year'],
          name: 'unique_budget',
        },
      ],
    }
  );

  Budget.associate = (models) => {
    Budget.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Budget.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
  };

  return Budget;
};
