const simulacionService = require('../application/simulacion.service');

async function ejecutar(req, res) {
  try {
    const { perfilId, estrategiaAId, estrategiaBId, usuarioId } = req.body;
    if (!perfilId || !estrategiaAId || !usuarioId) {
      return res.status(400).json({ error: 'perfilId, estrategiaAId y usuarioId son requeridos' });
    }
    const resultado = await simulacionService.ejecutarSimulacion({
      perfilId, estrategiaAId, estrategiaBId, usuarioId
    });
    res.json(resultado);
  } catch (error) {
    if (error.codigo === 'ESTRATEGIA_NO_ENCONTRADA') {
      return res.status(404).json({ error: error.message });
    }
    console.error('Error al ejecutar simulación:', error);
    res.status(500).json({ status: 'error', mensaje: 'No se pudo ejecutar la simulación' });
  }
}

module.exports = { ejecutar };