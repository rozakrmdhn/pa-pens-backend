const logbookController = require('../controllers/logbookController');

module.exports = [
    {
        method: 'GET',
        path: '',
        handler: logbookController.getAllLogbook
    },
    {
        method: 'GET',
        path: '/mahasiswa/{id_mahasiswa}',
        handler: logbookController.getLogbookByMahasiswa
    }
];