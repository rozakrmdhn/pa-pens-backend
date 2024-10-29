const mahasiswaController = require('../controllers/mahasiswaController');

module.exports = [
    {
        method: 'GET', 
        path: '', 
        handler: mahasiswaController.getAllMahasiswa,
        options: { auth: 'jwt' }
    },
    {
        method: 'POST',
        path: '',
        handler: mahasiswaController.createMahasiswa,
    },
    {
        method: 'PUT',
        path: '/{id}',
        handler: mahasiswaController.updateMahasiswa,
        options: { auth: 'jwt' }
    },
    {
        method: 'DELETE',
        path: '/{id}',
        handler: mahasiswaController.deleteMahasiswa,
        options: { auth: 'jwt' }
    },
    {
        method: 'GET',
        path: '/{id}',
        handler: mahasiswaController.getMahasiswaById,
        options: { auth: 'jwt' }
    },
    {
        method: 'GET',
        path: '/sebaran',
        handler: mahasiswaController.getSebaranMahasiswa,
        options: { auth: 'jwt' }
    }
];