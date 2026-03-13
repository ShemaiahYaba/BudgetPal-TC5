'use strict';

const settings = require('./settings');
const { Sequelize } = require('sequelize');

const dbConfig = {
  username: settings.db.user,
  password: settings.db.password,
  database: settings.db.name,
  host: settings.db.host,
  port: settings.db.port,
  dialect: 'mysql',
  logging: false,
};

// sequelize-cli config (read by .sequelizerc via development/test/production keys)
const config = {
  development: dbConfig,
  test: dbConfig,
  production: dbConfig,
};

// Runtime Sequelize instance
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

module.exports = Object.assign(sequelize, config);
