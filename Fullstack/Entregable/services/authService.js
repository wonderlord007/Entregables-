const UserAuth = require('../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET || 'secret-key';
    }

    async register(data) {
        const existingUser = await UserAuth.findOne({ email: data.email });
        if (existingUser) {
            throw new Error('El email ya está registrado');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const userAuth = new UserAuth({
            email: data.email,
            password: hashedPassword
        });
        return await userAuth.save();
    }

    async filterByEmail(email) {
        return await UserAuth.findOne({ email });
    }

    generateToken(payload) {
        return jwt.sign(payload, this.jwtSecret, { expiresIn: '8h' });
    }
}

module.exports = AuthService