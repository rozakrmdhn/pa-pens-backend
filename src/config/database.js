const Pool = require('pg').Pool;
 
const pool = new Pool({
    host: '103.87.16.49',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'db_magang'
});
 
module.exports = pool;