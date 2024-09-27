const { Sequelize } = require('sequelize');
const config = require('../config/config').development;

const sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Dosen = require('./dosen')(sequelize, Sequelize);

module.exports = db;