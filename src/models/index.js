import { Sequelize } from 'sequelize';
import settings from '../config/settings.js';

// Models imported here as they are created (Task 2):
// import defineUser from './User.js';
// import defineCategory from './Category.js';
// import defineTransaction from './Transaction.js';
// import defineBudget from './Budget.js';

const sequelize = new Sequelize(
  settings.db.name,
  settings.db.user,
  settings.db.password,
  {
    host: settings.db.host,
    port: settings.db.port,
    dialect: 'mysql',
    logging: false,
  }
);

// const User        = defineUser(sequelize);
// const Category    = defineCategory(sequelize);
// const Transaction = defineTransaction(sequelize);
// const Budget      = defineBudget(sequelize);

// const models = { User, Category, Transaction, Budget };
// Object.values(models).forEach((m) => m.associate && m.associate(models));

export { sequelize, Sequelize };
// export { sequelize, Sequelize, User, Category, Transaction, Budget };
