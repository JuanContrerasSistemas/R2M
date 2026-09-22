const auditoriaService = require('../application/auditoria.service');
async function historialGeneral(req, res) {
  try {
    const eventos = await auditoriaService.obtenerHistorialGeneral();
    res.json(eventos);
  } catch (error) {
    console.error('Error al obtener historial de auditoría:', error);
    res.status(500).json({ status: 'error', mensaje: 'No se pudo obtener el historial' });
  }
}

async function historialPorEstrategia(req, res) {
  try {
    const eventos = await auditoriaService.obtenerHistorialDeEstrategia(req.params.estrategiaId);
    res.json(eventos);
  } catch (error) {
    console.error('Error al obtener historial de estrategia:', error);
    res.status(500).json({ status: 'error', mensaje: 'No se pudo obtener el historial' });
  }
}

async function obtener(req, res) {
  try {
    const evento = await auditoriaService.obtenerDetalle(req.params.id);
    if (!evento) return res.status(404).json({ error: 'Evento no encontrado' });
    res.json(evento);
  } catch (error) {
    console.error('Error al obtener detalle de evento:', error);
    res.status(500).json({ status: 'error', mensaje: 'No se pudo obtener el evento' });
  }
}

module.exports = { historialGeneral, historialPorEstrategia, obtener };