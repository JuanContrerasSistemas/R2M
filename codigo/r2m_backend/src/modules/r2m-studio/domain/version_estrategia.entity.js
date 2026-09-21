class VersionEstrategia {
  constructor({ id, estrategiaId, numeroVersion, configuracion, estado, fecha }) {
    this.id = id;
    this.estrategiaId = estrategiaId;
    this.numeroVersion = numeroVersion;
    this.configuracion = configuracion;
    this.estado = estado;
    this.fecha = fecha;
  }
}

module.exports = VersionEstrategia;