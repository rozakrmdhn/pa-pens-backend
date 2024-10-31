const mahasiswaController = require('../controllers/mahasiswaController');
const verifyRole = require('../middleware/verifyRole');

module.exports = [
    {
        method: 'GET', 
        path: '', 
        handler: mahasiswaController.getAllMahasiswa,
        options: { auth: 'jwt', pre: [verifyRole(['admin', 'dosen', 'mahasiswa'])] }
    },
    {
        method: 'POST',
        path: '',
        handler: mahasiswaController.createMahasiswa,
        options: { auth: 'jwt', pre: [verifyRole(['admin'])] }
    },
    {
        method: 'PUT',
        path: '/{id}',
        handler: mahasiswaController.updateMahasiswa,
        options: { auth: 'jwt', pre: [verifyRole(['admin'])] }
    },
    {
        method: 'DELETE',
        path: '/{id}',
        handler: mahasiswaController.deleteMahasiswa,
        options: { auth: 'jwt', pre: [verifyRole(['admin'])] }
    },
    {
        method: 'GET',
        path: '/{id}',
        handler: mahasiswaController.getMahasiswaById,
        options: { auth: 'jwt', pre: [verifyRole(['admin', 'dosen', 'mahasiswa'])] }
    },
    {
        method: 'GET',
        path: '/sebaran',
        handler: mahasiswaController.getSebaranMahasiswa,
        options: { auth: false }
    }
];