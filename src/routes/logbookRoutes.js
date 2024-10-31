const logbookController = require('../controllers/logbookController');
const verifyRole = require('../middleware/verifyRole');

module.exports = [
    {
        method: 'POST',
        path: '',
        handler: logbookController.createLogbook,
        options: {
            auth: 'jwt',
            payload: {
                maxBytes: 1024 * 1024 * 5,
                output: 'stream',
                parse: true,
                multipart: true
            },
            pre: [verifyRole(['mahasiswa'])]
        }
    },
    {
        method: 'GET',
        path: '',
        handler: logbookController.getAllLogbook,
        options: { auth: 'jwt', pre: [verifyRole(['admin', 'dosen', 'mahasiswa'])] }
    },
    {
        method: 'DELETE',
        path: '/{id}',
        handler: logbookController.deleteLogbook,
        options: { auth: 'jwt', pre: [verifyRole(['admin', 'mahasiswa'])] }
    },
    {
        method: 'GET',
        path: '/mahasiswa/{id_mahasiswa}',
        handler: logbookController.getLogbookByMahasiswa,
        options: { auth: 'jwt', pre: [verifyRole(['admin', 'dosen', 'mahasiswa'])] }
    },
    {
        method: 'POST',
        path: '/mahasiswa',
        handler: logbookController.getLogbookMahasiswa,
        options: { auth: 'jwt', pre: [verifyRole(['admin', 'dosen', 'mahasiswa'])] }
    },
    {
        method: 'PUT',
        path: '/monitoring/{id}',
        handler: logbookController.createLogbookMonitoring,
        options: { auth: 'jwt', pre: [verifyRole(['admin', 'dosen'])] }
    },
    {
        method: 'POST',
        path: '/monitoring',
        handler: logbookController.getLogbookMonitoring,
        options: { auth: 'jwt', pre: [verifyRole(['admin', 'dosen'])] }
    }
];