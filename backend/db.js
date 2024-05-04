/**
 * db.js
 * -----
 * Establishes a connection to the 'foodie_fit' PostgreSQL database and exports 
 * the connection object for use throughout the application.
 *
 * Dependencies:
 * *  pg:  PostgreSQL client library for Node.js.
 * *  config.js: Provides database configuration details.
 */

const { Client } = require("pg");
const { DB } = require("./config");

let db = new Client({
    host: "/var/run/postgresql",
    database: DB
});
  
db.connect();
  
module.exports = db;