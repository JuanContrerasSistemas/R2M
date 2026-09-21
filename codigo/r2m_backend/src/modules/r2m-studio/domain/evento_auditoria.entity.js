class EventoAuditoria {
  constructor({ id, estrategiaId, usuarioId, accion, detalle, fecha }) {
    this.id = id;
    this.estrategiaId = estrategiaId;
    this.usuarioId = usuarioId;
    this.accion = accion;
    this.detalle = detalle;
    this.fecha = fecha;
  }
}

module.exports = EventoAuditoria;