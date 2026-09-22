const express = require('express');
const controller = require('./analitica.controller');

const router = express.Router();
router.get('/', controller.obtener);

module.exports = router;