const xaiService = require('../application/xai.service');

async function obtenerExplicacion(req, res) {
  try {
    const { perfilId, fecha, productoId } = req.query;
    if (!perfilId || !productoId) {
      return res.status(400).json({ error: 'perfilId y productoId son requeridos' });
    }
    const explicacion = await xaiService.obtenerExplicacion({ perfilId, fecha, productoId });
    res.json(explicacion);
  } catch (error) {
    console.error('Error al obtener explicación XAI:', error);
    res.status(500).json({ status: 'error', mensaje: 'No se pudo obtener la explicación' });
  }
}

module.exports = { obtenerExplicacion };