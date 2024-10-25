const mahasiswaController = require('../controllers/mahasiswaController');

module.exports = [
    {
        method: 'GET', 
        path: '', 
        handler: mahasiswaController.getAllMahasiswa,
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
    },
    {
        method: 'DELETE',
        path: '/{id}',
        handler: mahasiswaController.deleteMahasiswa,
    },
    {
        method: 'GET',
        path: '/{id}',
        handler: mahasiswaController.getMahasiswaById,
    },
    {
        method: 'GET',
        path: '/sebaran',
        handler: mahasiswaController.getSebaranMahasiswa,
    }
];