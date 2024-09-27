const dosenController = require('../controllers/dosenController');

module.exports = [
    {
        method: 'GET', 
        path: '', 
        handler: dosenController.getAllDosen,
    },
    {
        method: 'GET',
        path: '/{id}',
        handler: dosenController.getDosenById,
    },
    {
        method: 'DELETE',
        path: '/{id}',
        handler: dosenController.deleteDosen,
    },
    {
        method: 'POST',
        path: '',
        handler: dosenController.createDosen,
    },
    {
        method: 'PUT',
        path: '/{id}',
        handler: dosenController.updateDosen,
    }
];