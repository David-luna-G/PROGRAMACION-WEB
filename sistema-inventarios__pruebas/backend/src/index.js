const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get('/api/status', async (req, res) => {
  try {
    const dbRes = await pool.query('SELECT NOW()');
    res.json({ status: 'Backend funcionando 🚀', db_time: dbRes.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: 'Error conectando a la DB', detalle: err.message });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Servidor activo'));