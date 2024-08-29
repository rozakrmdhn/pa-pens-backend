'use strict';
const Hapi = require('@hapi/hapi');
// Include Route
const dosenRoutes = require('./src/routes/dosenRoutes');

const init = async () => {
    const server = Hapi.server({
        port: process.env._PORT,
        host: process.env._HOST,
        'routes': {
            'cors': true
        }
    });

    // Home Route
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World';
        }
    });

    // Method Prefixer Route
    const allRoutes = [];
    const api = '/api/';
    const prefixer = (routeArray, apiPrefix, subRoutePrefix) => {
        routeArray.map(route => {
            route.path = `${apiPrefix}${subRoutePrefix}${route.path}`;
            allRoutes.push(route);
        });
    };
    // Define Prefix Route
    prefixer(dosenRoutes, api, 'dosen');
    // Route List
    server.route(allRoutes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();