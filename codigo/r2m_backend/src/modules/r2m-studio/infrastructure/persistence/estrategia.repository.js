const pool = require('../../../../shared/config/db');
const Estrategia = require('../../domain/estrategia.entity');
const VersionEstrategia = require('../../domain/version_estrategia.entity');

function mapEstrategia(row) {
  if (!row) return null;
  return new Estrategia({
    id: row.id,
    nombre: row.nombre,
    descripcion: row.descripcion,
    objetivo: row.objetivo,
    estado: row.estado,
    versionId: row.version_id,
    fechaInicial: row.fecha_inicial,
    fechaNueva: row.fecha_nueva
  });
}

function mapVersion(row) {
  if (!row) return null;
  return new VersionEstrategia({
    id: row.id,
    estrategiaId: row.estrategia_id,
    numeroVersion: row.numero_version,
    configuracion: row.configuracion,
    estado: row.estado,
    fecha: row.fecha
  });
}

async function crear({ nombre, descripcion, objetivo }) {
  const result = await pool.query(
    `INSERT INTO estrategias (nombre, descripcion, objetivo)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [nombre, descripcion, objetivo]
  );
  return mapEstrategia(result.rows[0]);
}

async function listar() {
  const result = await pool.query('SELECT * FROM estrategias ORDER BY fecha_inicial DESC');
  return result.rows.map(mapEstrategia);
}

async function buscarPorId(id) {
  const result = await pool.query('SELECT * FROM estrategias WHERE id = $1', [id]);
  return mapEstrategia(result.rows[0]);
}

async function actualizarVersionActiva(estrategiaId, versionId) {
  await pool.query(
    'UPDATE estrategias SET version_id = $1, fecha_nueva = NOW() WHERE id = $2',
    [versionId, estrategiaId]
  );
}

async function obtenerSiguienteNumeroVersion(estrategiaId) {
  const result = await pool.query(
    'SELECT COALESCE(MAX(numero_version), 0) + 1 AS siguiente FROM versiones_estrategia WHERE estrategia_id = $1',
    [estrategiaId]
  );
  return result.rows[0].siguiente;
}

async function buscarVersionActiva(estrategiaId) {
  const result = await pool.query(
  "SELECT * FROM versiones_estrategia WHERE estrategia_id = $1 AND estado = 'ACTIVA'",
  [estrategiaId]
);
  return mapVersion(result.rows[0]);
}

async function marcarVersionComoHistorica(versionId) {
  await pool.query("UPDATE versiones_estrategia SET estado = 'HISTORICA' WHERE id = $1", [versionId]);
}

async function crearVersion({ estrategiaId, numeroVersion, configuracion, estado }) {
  const result = await pool.query(
    `INSERT INTO versiones_estrategia (estrategia_id, numero_version, configuracion, estado)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [estrategiaId, numeroVersion, configuracion, estado]
  );
  return mapVersion(result.rows[0]);
}

async function listarVersiones(estrategiaId) {
  const result = await pool.query(
    'SELECT * FROM versiones_estrategia WHERE estrategia_id = $1 ORDER BY numero_version DESC',
    [estrategiaId]
  );
  return result.rows.map(mapVersion);
}

module.exports = {
  crear, listar, buscarPorId, actualizarVersionActiva,
  obtenerSiguienteNumeroVersion, buscarVersionActiva,
  marcarVersionComoHistorica, crearVersion, listarVersiones
};