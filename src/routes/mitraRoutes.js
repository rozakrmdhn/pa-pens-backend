const mitraController = require('../controllers/mitraController');

module.exports = [
    {
        method: 'GET', 
        path: '', 
        handler: mitraController.getAllMitra,
    },
    {
        method: 'GET',
        path: '/{id}',
        handler: mitraController.getMitraById,
    },
    {
        method: 'DELETE',
        path: '/{id}',
        handler: mitraController.deleteMitra,
    },
    {
        method: 'POST',
        path: '',
        handler: mitraController.createMitra,
    },
    {
        method: 'PUT',
        path: '/{id}',
        handler: mitraController.updateMitra,
    }
];