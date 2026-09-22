// TODO: cuando existan eventos reales en eventos_usuario y afinidades calculadas
// por R2M Core, reemplazar el MOCK por las consultas reales.
async function obtenerExplicacion({ perfilId, fecha, productoId }) {
  return {
    mock: true,
    perfilId,
    productoId,
    fecha,
    estrategia: 'Fashion Default',
    version: 2,
    scores: { afinidad: 0.71, tendencia: 0.45, popularidad: 0.6 },
    afinidades: { categoria: 'Camisas', scoreCategoria: 0.8, marca: 'Nike', scoreMarca: 0.6 },
    tendencias: [{ nombre: 'Oversize', score: 0.55 }],
    explicacion: 'Recomendado porque coincide con tu afinidad de categoría y una tendencia activa (datos de ejemplo)'
  };
}

module.exports = { obtenerExplicacion };