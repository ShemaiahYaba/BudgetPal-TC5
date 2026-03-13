import { DataTypes } from 'sequelize';
import { TRANSACTION_TYPES } from '../constants/index.js';

export default (sequelize) => {
  const Transaction = sequelize.define(
    'Transaction',
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
      type: {
        type: DataTypes.ENUM(...Object.values(TRANSACTION_TYPES)),
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: true,
      tableName: 'transactions',
    }
  );

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Transaction.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
  };

  return Transaction;
};
