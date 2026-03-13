import settings from './settings.js';

export default {
  development: {
    username: settings.db.user,
    password: settings.db.password,
    database: settings.db.name,
    host: settings.db.host,
    port: settings.db.port,
    dialect: "mysql",
    logging: false,
  },
  production: {
    username: settings.db.user,
    password: settings.db.password,
    database: settings.db.name,
    host: settings.db.host,
    port: settings.db.port,
    dialect: "mysql",
    logging: false,
  },
};
