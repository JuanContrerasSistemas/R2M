const estrategiaRepository = require('../infrastructure/persistence/estrategia.repository');
const auditoriaService = require('./auditoria.service');

// TODO: cuando R2M Core tenga su motor de scoring listo, reemplazar el bloque
// "resultado MOCK" por la llamada real a su servicio de recomendaciones.
async function ejecutarSimulacion({ perfilId, estrategiaAId, estrategiaBId = null, usuarioId }) {
  const estrategiaA = await estrategiaRepository.buscarPorId(estrategiaAId);
  if (!estrategiaA) {
    const error = new Error('La estrategia A no existe');
    error.codigo = 'ESTRATEGIA_NO_ENCONTRADA';
    throw error;
  }

  let estrategiaB = null;
  if (estrategiaBId) {
    estrategiaB = await estrategiaRepository.buscarPorId(estrategiaBId);
    if (!estrategiaB) {
      const error = new Error('La estrategia B no existe');
      error.codigo = 'ESTRATEGIA_NO_ENCONTRADA';
      throw error;
    }
  }

  // ---- MOCK: reemplazar cuando exista el motor real de R2M Core ----
  const resultado = {
    mock: true,
    resultados: [
      { productoId: 1, scoreA: 0.82, scoreB: estrategiaB ? 0.75 : null },
      { productoId: 2, scoreA: 0.67, scoreB: estrategiaB ? 0.71 : null }
    ],
    cambiosPosicion: estrategiaB ? [{ productoId: 2, posicionA: 2, posicionB: 1 }] : [],
    productosNuevos: [],
    variacionesScore: estrategiaB ? [{ productoId: 1, variacion: -0.07 }] : []
  };
  // --------------------------------------------------------------------

  await auditoriaService.registrarEvento({
    estrategiaId: estrategiaAId,
    usuarioId,
    accion: 'EJECUTAR_SIMULACION',
    detalle: { perfilId, estrategiaAId, estrategiaBId }
  });

  return resultado;
}

module.exports = { ejecutarSimulacion };