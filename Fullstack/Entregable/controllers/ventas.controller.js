const Venta = require('../models/Venta');
const Producto = require('../models/Producto');

exports.obtenerVentas = async (req, res) => {
    try {
        const ventas = await Venta.find().sort({ createdAt: -1 }).populate('productos.producto_id');
        res.json(ventas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error al obtener el historial de ventas' });
    }
};

exports.crearVenta = async (req, res) => {
    try {
        const { productos } = req.body;
        let total_venta = 0;

        // 1. Validar y descontar stock
        for (let item of productos) {
            const producto = await Producto.findById(item.producto_id);
            if (!producto) {
                return res.status(404).json({ msg: `Producto no encontrado: ${item.producto_id}` });
            }
            if (producto.stock_actual < item.cantidad) {
                return res.status(400).json({ msg: `Stock insuficiente para ${producto.nombre}` });
            }
            producto.stock_actual -= item.cantidad;
            await producto.save();
            total_venta += item.cantidad * item.precio_unitario;
        }

        // 2. Crear y guardar la venta
        const nuevaVenta = new Venta({ productos, total_venta });
        await nuevaVenta.save();
        res.json({ msg: 'Venta creada exitosamente', venta: nuevaVenta });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error al procesar la venta' });
    }
};