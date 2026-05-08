const Producto = require('../models/Producto');

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).send('Hubo un error al obtener productos');
    }
};

// ALERTA DE STOCK: Obtener productos con stock menor o igual al mínimo
exports.obtenerAlertasStock = async (req, res) => {
    try {
        // Buscamos donde stock_actual sea menor o igual al stock_minimo
        // Usamos $expr para comparar dos campos en el mismo documento
        const alertas = await Producto.find({
            $expr: { $lte: ["$stock_actual", "$stock_minimo"] }
        });
        res.json(alertas);
    } catch (error) {
        res.status(500).send('Hubo un error al obtener alertas de stock');
    }
};

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
    try {
        const producto = new Producto(req.body);
        await producto.save();
        res.json(producto);
    } catch (error) {
        res.status(500).send('Hubo un error al crear el producto');
    }
};

// Obtener un producto por ID
exports.obtenerProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (error) {
        res.status(500).send('Hubo un error al obtener el producto');
    }
};

// Actualizar producto
exports.actualizarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!producto) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (error) {
        res.status(500).send('Hubo un error al actualizar el producto');
    }
};

// Eliminar producto
exports.eliminarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);
        if (!producto) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }
        res.json({ msg: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).send('Hubo un error al eliminar el producto');
    }
};