import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      reset_token: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      reset_expires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      refresh_token: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      refresh_expires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      underscored: true,
      timestamps: true,
      tableName: 'users',
      defaultScope: {
        attributes: { exclude: ['password', 'reset_token', 'reset_expires', 'refresh_token', 'refresh_expires'] },
      },
      scopes: {
        withPassword: { attributes: {} },
      },
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Category, { foreignKey: 'user_id', as: 'categories' });
    User.hasMany(models.Transaction, { foreignKey: 'user_id', as: 'transactions' });
    User.hasMany(models.Budget, { foreignKey: 'user_id', as: 'budgets' });
  };

  return User;
};
