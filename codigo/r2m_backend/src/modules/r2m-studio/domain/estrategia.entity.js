class Estrategia {
  constructor({ id, nombre, descripcion, objetivo, estado, versionId, fechaInicial, fechaNueva }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.objetivo = objetivo;
    this.estado = estado;
    this.versionId = versionId;
    this.fechaInicial = fechaInicial;
    this.fechaNueva = fechaNueva;
  }
}

module.exports = Estrategia;