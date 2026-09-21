const estrategiaRepository = require('../infrastructure/persistence/estrategia.repository');
const auditoriaService = require('./auditoria.service'); // mismo folder application/


async function crearEstrategia({ nombre, descripcion, objetivo, usuarioId }) {
  const estrategia = await estrategiaRepository.crear({ nombre, descripcion, objetivo });

  await auditoriaService.registrarEvento({
    estrategiaId: estrategia.id,
    usuarioId,
    accion: 'CREAR_ESTRATEGIA',
    detalle: { nombre, objetivo }
  });

  return estrategia;
}

async function listarEstrategias() {
  return estrategiaRepository.listar();
}

async function obtenerEstrategia(id) {
  const estrategia = await estrategiaRepository.buscarPorId(id);
  if (!estrategia) return null;
  const versiones = await estrategiaRepository.listarVersiones(id);
  return { ...estrategia, versiones };
}

async function crearYActivarVersion({ estrategiaId, configuracion, usuarioId }) {
  const numeroVersion = await estrategiaRepository.obtenerSiguienteNumeroVersion(estrategiaId);
  const versionAnterior = await estrategiaRepository.buscarVersionActiva(estrategiaId);

  if (versionAnterior) {
    await estrategiaRepository.marcarVersionComoHistorica(versionAnterior.id);
  }

  const nuevaVersion = await estrategiaRepository.crearVersion({
  estrategiaId,
  numeroVersion,
  configuracion,
  estado: 'ACTIVA'
});

  await estrategiaRepository.actualizarVersionActiva(estrategiaId, nuevaVersion.id);

  await auditoriaService.registrarEvento({
    estrategiaId,
    usuarioId,
    accion: 'ACTIVAR_VERSION',
    detalle: {
      versionAnterior: versionAnterior ? versionAnterior.numeroVersion : null,
      versionNueva: numeroVersion
    }
  });

  return nuevaVersion;
}

module.exports = { crearEstrategia, listarEstrategias, obtenerEstrategia, crearYActivarVersion };