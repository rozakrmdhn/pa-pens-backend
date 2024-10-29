const mitraController = require('../controllers/mitraController');

module.exports = [
    {
        method: 'GET', 
        path: '', 
        handler: mitraController.getAllMitra,
        options: { auth: 'jwt' }
    },
    {
        method: 'GET',
        path: '/{id}',
        handler: mitraController.getMitraById,
        options: { auth: 'jwt' }
    },
    {
        method: 'DELETE',
        path: '/{id}',
        handler: mitraController.deleteMitra,
        options: { auth: 'jwt' }
    },
    {
        method: 'POST',
        path: '',
        handler: mitraController.createMitra,
        options: { auth: 'jwt' }
    },
    {
        method: 'PUT',
        path: '/{id}',
        handler: mitraController.updateMitra,
        options: { auth: 'jwt' }
    }
];