const express = require('express');
const controller = require('./estrategia.controller'); // mismo folder presentation/

const router = express.Router();
router.post('/', controller.crear);
router.get('/', controller.listar);
router.get('/:id', controller.obtener);
router.post('/:id/versiones', controller.crearVersion);

module.exports = router;