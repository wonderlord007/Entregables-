const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number, required: true, min: 0 },
    stock_actual: { type: Number, required: true, min: 0 },
    stock_minimo: { type: Number, required: true, min: 0 } // Clave para las alertas
}, { timestamps: true });

module.exports = mongoose.model('Producto', productoSchema);