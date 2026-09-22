// TODO: reemplazar por consultas reales una vez existan pedidos (E-commerce)
// y tendencias/afinidades con datos reales (R2M Core).
async function obtenerAnalitica() {
  return {
    mock: true,
    kpis: { ctr: 0.24, conversion: 0.08, recomendacionesGeneradas: 0 },
    tendencias: [{ nombre: 'Oversize', impacto: 'alto', influencia: 0.6 }],
    afinidades: { categorias: [{ nombre: 'Camisas', score: 0.8 }], marcas: [{ nombre: 'Nike', score: 0.6 }] },
    comportamiento: { masRecomendados: [], masConsultados: [], masComprados: [] }
  };
}

module.exports = { obtenerAnalitica };