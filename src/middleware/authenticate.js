const JWT = require('@hapi/jwt');

const authenticateJWT = {
    name: 'jwt-authentication',
    version: '1.0.0',
    register: async (server, options) => {
        await server.register(JWT);

        server.auth.strategy('jwt', 'jwt', {
            keys: process.env.JWT_SECRET, // Secret key untuk JWT
            verify: {
                aud: false,
                iss: false,
                sub: false,
                nbf: true,
                exp: true,
                maxAgeSec: 3600, // Token berlaku selama 1 jam
                timeSkewSec: 15  // Toleransi waktu 15 detik
            },
            validate: (artifacts, request, h) => {
                // Artifacts berisi payload JWT yang sudah diverifikasi
                return {
                    isValid: true,
                    credentials: { user: artifacts.decoded.payload }
                };
            }
        });

        // Set default authentication strategy to 'jwt'
        server.auth.default('jwt');
    }
};

module.exports = authenticateJWT;