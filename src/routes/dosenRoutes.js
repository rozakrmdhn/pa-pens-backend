const verifyRole = require('../middleware/verifyRole');
const dosenController = require('../controllers/dosenController');

module.exports = [
    {
        method: 'GET', 
        path: '', 
        handler: dosenController.getAllDosen,
        options: { auth: 'jwt', pre: [verifyRole(['admin', 'dosen', 'mahasiswa'])] }
    },
    {
        method: 'GET',
        path: '/{id}',
        handler: dosenController.getDosenById,
        options: { auth: 'jwt', pre: [verifyRole(['admin', 'dosen', 'mahasiswa'])] }
    },
    {
        method: 'DELETE',
        path: '/{id}',
        handler: dosenController.deleteDosen,
        options: { auth: 'jwt', pre: [verifyRole(['admin'])] }
    },
    {
        method: 'POST',
        path: '',
        handler: dosenController.createDosen,
        options: { auth: 'jwt', pre: [verifyRole(['admin'])] }
    },
    {
        method: 'PUT',
        path: '/{id}',
        handler: dosenController.updateDosen,
        options: { auth: 'jwt', pre: [verifyRole(['admin'])] }
    },
    {
        method: 'GET',
        path: '/ploting',
        handler: dosenController.plotingDosenList,
        options: { auth: 'jwt', pre: [verifyRole(['admin'])] }
    }
];