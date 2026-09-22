const express = require('express');
const controller = require('./xai.controller');

const router = express.Router();
router.get('/explicacion', controller.obtenerExplicacion);

module.exports = router;