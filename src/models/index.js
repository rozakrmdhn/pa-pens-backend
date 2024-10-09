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
db.Mitra = require('./mitra')(sequelize, Sequelize);
db.Daftar = require('./daftar')(sequelize, Sequelize);
db.Anggota = require('./anggota')(sequelize, Sequelize);
db.Logbook = require('./logbook')(sequelize, Sequelize);

// Associate models
db.Daftar.associate(db);
db.Dosen.associate(db);
db.Mahasiswa.associate(db);
db.Anggota.associate(db);

module.exports = db;