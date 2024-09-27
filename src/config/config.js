const dotenv = require('dotenv').config();

module.exports = {
    development: {
        host: process.env.DB_ENDPOINT,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        dialect: 'postgres',
    },
};