// requires
const pg = require('pg');

// Config (Create connection to DB)
const pool = new pg.Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

// handles connection event
pool.on("connect", () => {
    console.log("connected to postgres");
});

// handles errors from connection
pool.on("error", (err) => {
    console.log("error connecting to postgres", err); 
});

// Shares the DB connection
module.exports = pool;