const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/img', express.static(path.join(__dirname, '..', 'pagina.web', 'img')));

const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3307, // el puerto que cambiamos en el compose
  user: 'madatech',
  password: 'madatech1234',
  database: 'madatech',
});

// Devuelve los productos con el mismo formato que usa script.js:
// { id, name, category, price, rating, reviewsCount, image, description, specs, stock, brand }
app.get('/api/productos', async (req, res) => {
  try {
    const [productos] = await pool.query(`
      SELECT p.id_producto AS id,
             p.nombre AS name,
             c.nombre AS category,
             m.nombre AS brand,
             p.precio AS price,
             p.calificacion_prom AS rating,
             p.numero_resenas AS reviewsCount,
             p.imagen_url AS image,
             p.descripcion AS description,
             p.stock AS stock
      FROM productos p
      JOIN categorias c ON c.id_categoria = p.id_categoria
      JOIN marcas m ON m.id_marca = p.id_marca
      WHERE p.activo = TRUE
      ORDER BY p.id_producto
    `);

    const [specs] = await pool.query(`
      SELECT id_producto, especificacion
      FROM especificaciones_producto
      ORDER BY id_producto, orden
    `);

    const specsPorProducto = {};
    for (const s of specs) {
      (specsPorProducto[s.id_producto] ??= []).push(s.especificacion);
    }

    res.json(productos.map(p => ({
      ...p,
      price: Number(p.price),
      rating: Number(p.rating),
      specs: specsPorProducto[p.id] || [],
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al consultar productos' });
  }
});

// Usuarios (registro, login, perfil) -> backend/auth.js
require('./auth').configurarAuth(app, pool);
// Compras (crear pedido, historial) -> backend/pedidos.js
require('./pedidos').configurarPedidos(app, pool);

async function iniciarServidor() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS sesiones_usuario (
      id_sesion INT AUTO_INCREMENT PRIMARY KEY,
      id_usuario INT NOT NULL,
      token_hash CHAR(64) NOT NULL UNIQUE,
      fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      fecha_expiracion DATETIME NOT NULL,
      FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
      INDEX idx_sesiones_expiracion (fecha_expiracion)
    ) ENGINE=InnoDB
  `);

  const [paymentDateColumn] = await pool.query("SHOW COLUMNS FROM pagos LIKE 'fecha_pago'");
  if (paymentDateColumn.length === 0) {
    await pool.query('ALTER TABLE pagos ADD COLUMN fecha_pago DATETIME NULL AFTER estado_pago');
  }

  const [cardLast4Column] = await pool.query("SHOW COLUMNS FROM pagos LIKE 'ultimos4_tarjeta'");
  if (cardLast4Column.length === 0) {
    await pool.query('ALTER TABLE pagos ADD COLUMN ultimos4_tarjeta CHAR(4) NULL AFTER fecha_pago');
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => console.log(`API lista en http://localhost:${port}`));
}

iniciarServidor().catch(error => {
  console.error('No se pudo iniciar la API', error);
  process.exitCode = 1;
});