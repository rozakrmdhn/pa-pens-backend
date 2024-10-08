'use strict';
// Plugin
const Hapi = require('@hapi/hapi');

// Include Route
const authRoutes = require('./src/routes/authRoutes');
const dosenRoutes = require('./src/routes/dosenRoutes');
const mahasiswaRoutes = require('./src/routes/mahasiswaRoutes');
const magangRoutes = require('./src/routes/magangRoutes');
const mitraRoutes = require('./src/routes/mitraRoutes');
const anggotaRoutes = require('./src/routes/anggotaRoutes');

const init = async () => {
    const allRoutes = [];
    const api = '/api/';

    const server = Hapi.server({
        port: process.env._PORT,
        host: process.env._HOST,
        'routes': {
            'cors': true
        }
    });

    //-- ROUTE MANAGE --//
    //-- Prefixer Route --//
    const prefixer = (routeArray, apiPrefix, subRoutePrefix) => {
        routeArray.map(route => {
            route.path = `${apiPrefix}${subRoutePrefix}${route.path}`;
            allRoutes.push(route);
        });
    };
    // Apply Prefixes to Routes
    prefixer(authRoutes, api, 'auth');
    prefixer(dosenRoutes, api, 'dosen');
    prefixer(mahasiswaRoutes, api, 'mahasiswa');
    prefixer(magangRoutes, api, 'magang');
    prefixer(anggotaRoutes, api, 'magang');
    prefixer(mitraRoutes, api, 'mitra');

    server.route(allRoutes);
    //-- ROUTE MANAGE --//

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();