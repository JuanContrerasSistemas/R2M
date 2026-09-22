const analiticaService = require('../application/analitica.service');

async function obtener(req, res) {
  try {
    const datos = await analiticaService.obtenerAnalitica();
    res.json(datos);
  } catch (error) {
    console.error('Error al obtener analítica:', error);
    res.status(500).json({ status: 'error', mensaje: 'No se pudo obtener la analítica' });
  }
}

module.exports = { obtener };