const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
require('dotenv').config();

const app = express();

// Conectar a MongoDB
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Configurar vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Ruta raíz - Renderizar vista
app.get('/', (req, res) => {
    res.render('index');
});

// Rutas API
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/ventas', require('./routes/ventas.routes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});