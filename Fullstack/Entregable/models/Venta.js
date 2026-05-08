const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
    productos: [{
        producto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
        cantidad: { type: Number, required: true },
        precio_unitario: { type: Number, required: true }
    }],
    total_venta: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Venta', ventaSchema);