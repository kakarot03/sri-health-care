const { Client } = require('pg');

const pool = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect();

module.exports = {
  query: (text, params) => pool.query(text, params),
};
