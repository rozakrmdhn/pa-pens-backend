const dotenv = require('dotenv');
const Pool = require('pg').Pool;

dotenv.config();
 
const pool = new Pool({
    host: process.env.DB_ENDPOINT,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
 
module.exports = pool;