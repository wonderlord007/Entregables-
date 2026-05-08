const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productos.controller');

router.get('/', productoController.obtenerProductos);
router.post('/', productoController.crearProducto);
router.get('/alertas', productoController.obtenerAlertasStock);
router.get('/:id', productoController.obtenerProducto);
router.put('/:id', productoController.actualizarProducto);
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;