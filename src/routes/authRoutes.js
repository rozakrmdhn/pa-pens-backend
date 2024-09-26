const JWT = require('@hapi/jwt');

const routes = [
    {
        method: 'POST',
        path: '/signin',
        options: {
            auth: false
        },
        handler: (request, h) => {
            const { username, password } = request.payload;
            // Verifikasi username dan password (misalnya cek ke database)
            if (username === 'user' && password === 'password') {
                const token = JWT.token.generate(
                    {
                        user: { id: 1, username: 'user' }
                    },
                    {
                        key: 'supersecretkey', algorithm: 'HS256'
                    }
                );
                return h.response({ token });
            } else {
                return h.response({ error: 'Invalid username or password' }).code(401);
            }
        }
    }
];

module.exports = routes;