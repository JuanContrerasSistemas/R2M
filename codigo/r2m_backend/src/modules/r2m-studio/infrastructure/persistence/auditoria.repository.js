const pool = require('../../../../shared/config/db');
const EventoAuditoria = require('../../domain/evento_auditoria.entity');

function mapRow(row) {
  if (!row) return null;
  return new EventoAuditoria({
    id: row.id,
    estrategiaId: row.estrategia_id,
    usuarioId: row.usuario_id,
    accion: row.accion,
    detalle: row.detalle,
    fecha: row.fecha
  });
}

async function registrar({ estrategiaId = null, usuarioId, accion, detalle }) {
  const result = await pool.query(
    `INSERT INTO eventos_auditoria (estrategia_id, usuario_id, accion, detalle)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [estrategiaId, usuarioId, accion, detalle]
  );
  return mapRow(result.rows[0]);
}

async function listarPorEstrategia(estrategiaId) {
  const result = await pool.query(
    'SELECT * FROM eventos_auditoria WHERE estrategia_id = $1 ORDER BY fecha DESC',
    [estrategiaId]
  );
  return result.rows.map(mapRow);
}

async function listarTodo() {
  const result = await pool.query('SELECT * FROM eventos_auditoria ORDER BY fecha DESC LIMIT 100');
  return result.rows.map(mapRow);
}

module.exports = { registrar, listarPorEstrategia, listarTodo };