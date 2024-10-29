const dosenController = require('../controllers/dosenController');

module.exports = [
    {
        method: 'GET', 
        path: '', 
        handler: dosenController.getAllDosen,
        options: { auth: 'jwt' }
    },
    {
        method: 'GET',
        path: '/{id}',
        handler: dosenController.getDosenById,
        options: { auth: 'jwt' }
    },
    {
        method: 'DELETE',
        path: '/{id}',
        handler: dosenController.deleteDosen,
        options: { auth: 'jwt' }
    },
    {
        method: 'POST',
        path: '',
        handler: dosenController.createDosen,
        options: { auth: 'jwt' }
    },
    {
        method: 'PUT',
        path: '/{id}',
        handler: dosenController.updateDosen,
        options: { auth: 'jwt' }
    },
    {
        method: 'GET',
        path: '/ploting',
        handler: dosenController.plotingDosenList,
        options: { auth: 'jwt' }
    }
];