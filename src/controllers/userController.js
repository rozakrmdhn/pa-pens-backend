const JWT = require('@hapi/jwt');
const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');
const { User } = require('../models');

const signIn = async (request, h) => {
    const { email, password } = request.payload;
    // Verifikasi username dan password (misalnya cek ke database)
    const user = await User.findOne({ where: { email } });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return response = h.response({
            status: 'error',
            message: 'Invalid credentials'
        }).code(401);
    }

    const token = JWT.token.generate(
        { 
            id: user.id, 
            id_mahasiswa: user.id_mahasiswa,
            id_dosen: user.id_dosen,
            role: user.role
        },
        { 
            key: process.env.JWT_SECRET, 
            algorithm: 'HS256', ttlSec: 3600 // exp 1 hour
        }
    );

    return response = h.response({
        status: 'success',
        message: 'Login berhasil',
        token
    }).code(200);
}

module.exports = {
    signIn
};