require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const apiLimiter = require('./shared/middlewares/rateLimiter');
const pool = require('./shared/config/db');

const estrategiaRoutes = require('./modules/r2m-studio/presentation/estrategia.routes');
const auditoriaRoutes = require('./modules/r2m-studio/presentation/auditoria.routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(apiLimiter);
app.use('/estrategias', estrategiaRoutes);
app.use('/auditoria', auditoriaRoutes);

app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: 'ok',
      servidor: 'R2M Backend',
      horaBaseDeDatos: result.rows[0].now
    });
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error);
    res.status(500).json({ status: 'error', mensaje: 'No se pudo conectar a la base de datos' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor R2M corriendo en http://localhost:${PORT}`);
});