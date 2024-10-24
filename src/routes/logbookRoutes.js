const logbookController = require('../controllers/logbookController');

module.exports = [
    {
        method: 'POST',
        path: '',
        handler: logbookController.createLogbook
    },
    {
        method: 'GET',
        path: '',
        handler: logbookController.getAllLogbook
    },
    {
        method: 'DELETE',
        path: '/{id}',
        handler: logbookController.deleteLogbook
    },
    {
        method: 'GET',
        path: '/mahasiswa/{id_mahasiswa}',
        handler: logbookController.getLogbookByMahasiswa
    },
    {
        method: 'POST',
        path: '/mahasiswa',
        handler: logbookController.getLogbookMahasiswa
    },
    {
        method: 'PUT',
        path: '/monitoring/{id}',
        handler: logbookController.createLogbookMonitoring
    },
    {
        method: 'POST',
        path: '/monitoring',
        handler: logbookController.getLogbookMonitoring
    }
];