const express = require('express');
const controller = require('./auditoria.controller');

const router = express.Router();

router.get('/', controller.historialGeneral);
router.get('/estrategia/:estrategiaId', controller.historialPorEstrategia);

module.exports = router;