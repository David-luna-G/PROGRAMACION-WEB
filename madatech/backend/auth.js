const { randomBytes, createHash, scrypt: scryptCallback, timingSafeEqual } = require('crypto');
const { promisify } = require('util');

const scrypt = promisify(scryptCallback);

function hashToken(token) {
  return createHash('sha256').update(token).digest('hex');
}

async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const key = await scrypt(password, salt, 64);
  return `scrypt$${salt}$${key.toString('hex')}`;
}

async function verifyPassword(password, passwordHash) {
  const [algorithm, salt, keyHex] = String(passwordHash).split('$');
  if (algorithm !== 'scrypt' || !salt || !keyHex || !/^[\da-f]+$/i.test(keyHex) || keyHex.length % 2 !== 0) {
    return false;
  }

  const expected = Buffer.from(keyHex, 'hex');
  const actual = await scrypt(password, salt, expected.length);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

async function crearSesion(pool, userId) {
  const token = randomBytes(32).toString('hex');
  await pool.execute(
    `INSERT INTO sesiones_usuario (id_usuario, token_hash, fecha_expiracion)
     VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 30 DAY))`,
    [userId, hashToken(token)]
  );
  return token;
}

async function verificarToken(req, res, next) {
  try {
    const authorization = req.get('authorization') || '';
    const match = authorization.match(/^Bearer ([\da-f]{64})$/i);
    if (!match) return res.status(401).json({ error: 'Inicia sesión para continuar' });

    const [sessions] = await req.app.locals.pool.execute(
      `SELECT s.id_sesion, u.id_usuario, u.nombre, u.correo
       FROM sesiones_usuario s
       JOIN usuarios u ON u.id_usuario = s.id_usuario
       WHERE s.token_hash = ? AND s.fecha_expiracion > NOW() AND u.activo = TRUE
       LIMIT 1`,
      [hashToken(match[1])]
    );
    if (sessions.length === 0) {
      return res.status(401).json({ error: 'La sesión venció. Inicia sesión de nuevo.' });
    }

    req.usuario = {
      id: sessions[0].id_usuario,
      nombre: sessions[0].nombre,
      correo: sessions[0].correo,
    };
    req.sesionId = sessions[0].id_sesion;
    next();
  } catch (error) {
    console.error('Error al verificar sesión', error);
    res.status(500).json({ error: 'No se pudo verificar la sesión' });
  }
}

function configurarAuth(app, pool) {
  app.locals.pool = pool;

  app.post('/api/auth/registro', async (req, res) => {
    const nombre = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
    const correo = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body?.password === 'string' ? req.body.password : '';

    if (!nombre || nombre.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) || correo.length > 254) {
      return res.status(400).json({ error: 'Ingresa un nombre y un correo válidos' });
    }
    if (password.length < 8 || password.length > 128) {
      return res.status(400).json({ error: 'La contraseña debe tener entre 8 y 128 caracteres' });
    }

    let connection;
    let transactionStarted = false;
    try {
      const passwordHash = await hashPassword(password);
      connection = await pool.getConnection();
      await connection.beginTransaction();
      transactionStarted = true;
      const [result] = await connection.execute(
        'INSERT INTO usuarios (nombre, correo, contrasena_hash) VALUES (?, ?, ?)',
        [nombre, correo, passwordHash]
      );
      const token = randomBytes(32).toString('hex');
      await connection.execute(
        `INSERT INTO sesiones_usuario (id_usuario, token_hash, fecha_expiracion)
         VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 30 DAY))`,
        [result.insertId, hashToken(token)]
      );
      await connection.commit();
      transactionStarted = false;
      res.status(201).json({ token, user: { id: result.insertId, name: nombre, email: correo } });
    } catch (error) {
      if (transactionStarted) await connection.rollback();
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Ya existe una cuenta con ese correo' });
      }
      console.error('Error al registrar usuario', error);
      res.status(500).json({ error: 'No se pudo crear la cuenta' });
    } finally {
      if (connection) connection.release();
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    const correo = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body?.password === 'string' ? req.body.password : '';
    if (!correo || !password) {
      return res.status(400).json({ error: 'Ingresa tu correo y contraseña' });
    }

    try {
      const [users] = await pool.execute(
        `SELECT id_usuario, nombre, correo, contrasena_hash
         FROM usuarios WHERE correo = ? AND activo = TRUE LIMIT 1`,
        [correo]
      );
      if (users.length === 0 || !(await verifyPassword(password, users[0].contrasena_hash))) {
        return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
      }

      const token = await crearSesion(pool, users[0].id_usuario);
      res.json({
        token,
        user: { id: users[0].id_usuario, name: users[0].nombre, email: users[0].correo },
      });
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      res.status(500).json({ error: 'No se pudo iniciar sesión' });
    }
  });

  app.get('/api/auth/me', verificarToken, (req, res) => {
    res.json({
      user: { id: req.usuario.id, name: req.usuario.nombre, email: req.usuario.correo },
    });
  });

  app.post('/api/auth/logout', verificarToken, async (req, res) => {
    try {
      await pool.execute('DELETE FROM sesiones_usuario WHERE id_sesion = ?', [req.sesionId]);
      res.json({ message: 'Sesión cerrada correctamente' });
    } catch (error) {
      console.error('Error al cerrar sesión', error);
      res.status(500).json({ error: 'No se pudo cerrar la sesión' });
    }
  });
}

module.exports = { configurarAuth, verificarToken };
