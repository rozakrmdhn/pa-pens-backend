const JWT = require('@hapi/jwt');
const bcrypt = require('bcrypt');
const { User } = require('../models');

// Access and refresh token expiration times
const ACCESS_TOKEN_TTL = 3600; // 1 hour in seconds
const REFRESH_TOKEN_TTL = 1 * 24 * 3600; // 1 days in seconds

const now = Math.floor(Date.now() / 1000);
const exp = now + 900;

// Generate tokens helper function
const generateTokens = (user) => {
    const accessToken = JWT.token.generate(
        {
            id: user.id,
            id_mahasiswa: user.id_mahasiswa,
            id_dosen: user.id_dosen,
            role: user.role,
            exp
        },
        {
            key: process.env.JWT_SECRET,
            algorithm: 'HS256',
            ttlSec: ACCESS_TOKEN_TTL,
        }
    );

    const refreshToken = JWT.token.generate(
        {
            id: user.id,
        },
        {
            key: process.env.JWT_SECRET,
            algorithm: 'HS256',
            ttlSec: REFRESH_TOKEN_TTL,
        }
    );

    return { accessToken, refreshToken };
};

const signIn = async (request, h) => {
    const { email, password } = request.payload;
    const user = await User.findOne({ where: { email } });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return response = h.response({
            status: 'error',
            message: 'Invalid credentials'
        }).code(401);
    }

    const { accessToken, refreshToken } = generateTokens(user);

    return response = h.response({
        status: 'success',
        message: 'Authentication success',
        data: {
            user: {
                id: user.id,
                id_mahasiswa: user.id_mahasiswa,
                id_dosen: user.id_dosen,
                role: user.role
            },
            accessToken
        }
    })
    .state('refreshToken', refreshToken, {
        isHttpOnly: true,
        // isSecure: process.env.NODE_ENV === 'production',
        path: '/',
        isSameSite: 'Strict',
        ttl: REFRESH_TOKEN_TTL * 1000
    }).code(200);
};

// Refresh token endpoint
const refreshAccessToken = async (request, h) => {
    const refreshToken = request.state.refreshToken;

    // Check if the refresh token exists
    if (!refreshToken) {
        return h.response({
            status: 'error',
            message: 'Refresh token not found',
        }).code(401);
    }

    try {
        // Decode and verify the refresh token
        const decoded = JWT.token.decode(refreshToken);
        JWT.token.verify(decoded, process.env.JWT_SECRET, { algorithms: ['HS256'] });

        // Fetch user details from the token's payload
        const userId = decoded.decoded.payload.id;
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Generate a new access token
        const { accessToken } = generateTokens(user);

        return h.response({
            status: 'success',
            message: 'Access token refreshed',
            data: { accessToken },
        }).code(200);
    } catch (error) {
        console.error('Failed to refresh token:', error);
        return h.response({
            status: 'error',
            message: 'Invalid or expired refresh token',
        }).code(401);
    }
};

// Sign-out function that removes the refresh token
const signOut = (request, h) => {
    return h.response({
        status: 'success',
        message: 'Logged out successfully'
    })
    .unstate('token', {
        isHttpOnly: true,
        // isSecure: process.env.NODE_ENV === 'production',
        path: '/',
        isSameSite: 'Strict'
    }).code(200);
};

module.exports = {
    signIn,
    signOut,
    refreshAccessToken
};