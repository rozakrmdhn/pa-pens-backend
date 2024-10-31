const anggotaController = require('../controllers/anggotaController');
const verifyRole = require('../middleware/verifyRole');

module.exports = [
    {
        method: 'POST',
        path: '/anggota/bulk',
        handler: anggotaController.createBulkAnggota,
        options: { auth: 'jwt', pre: [verifyRole(['admin', 'mahasiswa'])] }
    },
    {
        method: 'GET',
        path: '/anggota/{id}',
        handler: anggotaController.getAnggotaById,
        options: { auth: 'jwt', pre: [verifyRole(['admin', 'dosen', 'mahasiswa'])] }
    },
    {
        method: 'GET',
        path: '/anggota',
        handler: anggotaController.getAllAnggota,
        options: { auth: 'jwt', pre: [verifyRole(['admin', 'dosen', 'mahasiswa'])] }
    },
    {
        method: 'DELETE',
        path: '/anggota/{id}',
        handler: anggotaController.deleteAnggota,
        options: { auth: 'jwt', pre: [verifyRole(['admin', 'mahasiswa'])] }
    },
    {
        method: 'GET',
        path: '/anggota/pengajuan/{id_daftar}/mahasiswa/{id_mahasiswa}',
        handler: anggotaController.getAnggotaByMahasiswa,
        options: { auth: 'jwt', pre: [verifyRole(['admin', 'dosen', 'mahasiswa'])] }
    }
];