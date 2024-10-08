const anggotaController = require('../controllers/anggotaController');

module.exports = [
    {
        method: 'POST',
        path: '/pengajuan/{id_daftar}/bulk_anggota',
        handler: anggotaController.createBulkAnggota
    },
    {
        method: 'GET',
        path: '/anggota/{id}',
        handler: anggotaController.getAnggotaById
    },
    {
        method: 'GET',
        path: '/anggota/pengajuan/{id_daftar}',
        handler: anggotaController.getAllAnggota
    },
    {
        method: 'DELETE',
        path: '/pengajuan/{id_daftar}/anggota/{id}',
        handler: anggotaController.deleteAnggota
    },
    {
        method: 'GET',
        path: '/pengajuan/{id_daftar}/query',
        handler: anggotaController.getAnggotaByQuery
    }
];