const estrategiaService = require('../application/estrategia.service');

async function crear(req, res) {
  try {
    const { nombre, descripcion, objetivo, usuarioId } = req.body;
    if (!nombre || !descripcion || !usuarioId) {
      return res.status(400).json({ error: 'nombre, descripcion y usuarioId son requeridos' });
    }
    const estrategia = await estrategiaService.crearEstrategia({ nombre, descripcion, objetivo, usuarioId });
    res.status(201).json(estrategia);
  } catch (error) {
    console.error('Error al crear estrategia:', error);
    res.status(500).json({ status: 'error', mensaje: 'No se pudo crear la estrategia' });
  }
}

async function listar(req, res) {
  try {
    const estrategias = await estrategiaService.listarEstrategias();
    res.json(estrategias);
  } catch (error) {
    console.error('Error al listar estrategias:', error);
    res.status(500).json({ status: 'error', mensaje: 'No se pudieron listar las estrategias' });
  }
}

async function obtener(req, res) {
  try {
    const estrategia = await estrategiaService.obtenerEstrategia(req.params.id);
    if (!estrategia) return res.status(404).json({ error: 'Estrategia no encontrada' });
    res.json(estrategia);
  } catch (error) {
    console.error('Error al obtener estrategia:', error);
    res.status(500).json({ status: 'error', mensaje: 'No se pudo obtener la estrategia' });
  }
}

async function crearVersion(req, res) {
  try {
    const { configuracion, usuarioId } = req.body;
    if (!configuracion || !usuarioId) {
      return res.status(400).json({ error: 'configuracion y usuarioId son requeridos' });
    }
    const version = await estrategiaService.crearYActivarVersion({
      estrategiaId: req.params.id,
      configuracion,
      usuarioId
    });
    res.status(201).json(version);
  } catch (error) {
    console.error('Error al crear versión:', error);
    res.status(500).json({ status: 'error', mensaje: 'No se pudo crear la versión' });
  }
}

module.exports = { crear, listar, obtener, crearVersion };