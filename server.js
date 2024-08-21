'use strict';

const Hapi = require('@hapi/hapi');
const dosenRoutes = require('./src/routes/dosenRoutes')

const init = async () => {

    const server = Hapi.server({
        port: 8081,
        host: 'localhost',
        'routes': {
            'cors': true
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World';
        }
    });

    server.route(dosenRoutes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();