const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "pfp_platform",
  password: "postgres",
  port: 5432,
});

module.exports = pool;