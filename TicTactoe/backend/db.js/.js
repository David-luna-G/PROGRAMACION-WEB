const { Pool } = require('pg');

const pool = new Pool({
  user: 'game_admin',
  host: 'localhost',
  database: 'game_db',
  password: 'game_password',
  port: 5432,
});

pool.on('connect', () => {
  console.log('Conectado a la base de datos PostgreSQL mediante el driver');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
