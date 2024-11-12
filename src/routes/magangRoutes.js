const magangController = require('../controllers/magangController');
const verifyRole = require('../middleware/verifyRole');

module.exports = [
    {
        method: 'POST',
        path: '/pengajuan',
        handler: magangController.createPengajuan,
        options: { auth: false },
        options: { auth: 'jwt', pre: [verifyRole(['admin', 'mahasiswa'])] }
    },
    {
        method: 'PUT',
        path: '/pengajuan/{id}',
        handler: magangController.updatePengajuan,
        options: { auth: 'jwt', pre: [verifyRole(['admin', 'mahasiswa'])] }
    },
    {
        method: 'GET',
        path: '',
        handler: magangController.getAllPengajuan,
        // options: { auth: false }
        options: { auth: 'jwt', pre: [verifyRole(['admin', 'dosen', 'mahasiswa'])] }
    },{
        method: 'GET',
        path: '/pengajuan/mahasiswa/{id_mahasiswa}',
        handler: magangController.getPengajuanByMahasiswa,
        options: { auth: false }
    },
    {
        method: 'GET',
        path: '/pengajuan/{id}',
        handler: magangController.getPengajuanById,
        options: { auth: 'jwt', pre: [verifyRole(['admin', 'dosen', 'mahasiswa'])] }
    },
    {
        method: 'PUT',
        path: '/pengajuan/{id}/verifikasi',
        handler: magangController.verifikasiPengajuan,
        options: { auth: 'jwt', pre: [verifyRole(['admin'])] }
    },
    {
        method: 'PUT',
        path: '/pengajuan/{id}/ploting',
        handler: magangController.plotingDosbim,
        options: { auth: 'jwt', pre: [verifyRole(['admin'])] }
    },
    {
        method: 'GET',
        path: '/pengajuan/{id}/anggota',
        handler: magangController.getAnggotaByPengajuan,
        // options: { auth: false }
        options: { auth: 'jwt', pre: [verifyRole(['admin', 'dosen', 'mahasiswa'])] }
    }
];