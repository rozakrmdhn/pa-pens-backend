const anggotaController = require('../controllers/anggotaController');

module.exports = [
    {
        method: 'POST',
        path: '/anggota/bulk',
        handler: anggotaController.createBulkAnggota
    },
    {
        method: 'GET',
        path: '/anggota/{id}',
        handler: anggotaController.getAnggotaById
    },
    {
        method: 'GET',
        path: '/anggota',
        handler: anggotaController.getAllAnggota
    },
    {
        method: 'DELETE',
        path: '/anggota/{id}',
        handler: anggotaController.deleteAnggota
    },
    {
        method: 'GET',
        path: '/anggota/pengajuan/{id_daftar}/mahasiswa/{id_mahasiswa}',
        handler: anggotaController.getAnggotaByMahasiswa
    }
];