import { DataTypes } from 'sequelize';
import { CATEGORY_TYPES } from '../constants/index.js';

export default (sequelize) => {
  const Category = sequelize.define(
    'Category',
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
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(...Object.values(CATEGORY_TYPES)),
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: true,
      tableName: 'categories',
    }
  );

  Category.associate = (models) => {
    Category.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Category.hasMany(models.Transaction, { foreignKey: 'category_id', as: 'transactions' });
    Category.hasMany(models.Budget, { foreignKey: 'category_id', as: 'budgets' });
  };

  return Category;
};
