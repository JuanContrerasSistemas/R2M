const express = require('express');
const controller = require('./simulacion.controller');

const router = express.Router();
router.post('/', controller.ejecutar);

module.exports = router;