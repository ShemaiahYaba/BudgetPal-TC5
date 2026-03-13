import settings from './settings.js';
import { Sequelize } from 'sequelize';

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

export default sequelize;
