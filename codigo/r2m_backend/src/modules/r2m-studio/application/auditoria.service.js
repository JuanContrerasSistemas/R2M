const auditoriaRepository = require('../infrastructure/persistence/auditoria.repository');

async function registrarEvento({ estrategiaId, usuarioId, accion, detalle }) {
  return auditoriaRepository.registrar({ estrategiaId, usuarioId, accion, detalle });
}

async function obtenerHistorialDeEstrategia(estrategiaId) {
  return auditoriaRepository.listarPorEstrategia(estrategiaId);
}

async function obtenerHistorialGeneral() {
  return auditoriaRepository.listarTodo();
}

async function obtenerDetalle(id) {
  return auditoriaRepository.buscarPorId(id);
}

module.exports = { registrarEvento, obtenerHistorialDeEstrategia, obtenerHistorialGeneral, obtenerDetalle };