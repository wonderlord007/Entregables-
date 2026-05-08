const AuthService = require('../services/authService');
const bcrypt = require('bcrypt');
const authService = new AuthService();

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
        }

        const existingUser = await authService.filterByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        await authService.register(req.body);
        res.status(201).json({ mensaje: 'Usuario admin registrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
        }

        const userAuth = await authService.filterByEmail(email);
        if (!userAuth) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

        const passwordMatch = await bcrypt.compare(password, userAuth.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

        const payload = { email: userAuth.email };
        const token = authService.generateToken(payload);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};