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

// Load models
db.Dosen = require('./dosen')(sequelize, Sequelize);
db.Mahasiswa = require('./mahasiswa')(sequelize, Sequelize);
db.Daftar = require('./daftar')(sequelize, Sequelize);

// Associate models
db.Daftar.associate(db);
db.Mahasiswa.associate(db);

module.exports = db;