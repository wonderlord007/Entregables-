const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventas.controller');

router.get('/', ventaController.obtenerVentas);
router.post('/', ventaController.crearVenta);

module.exports = router;