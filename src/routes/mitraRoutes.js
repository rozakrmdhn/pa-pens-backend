const mitraController = require('../controllers/mitraController');
const verifyRole = require('../middleware/verifyRole');

module.exports = [
    {
        method: 'GET', 
        path: '', 
        handler: mitraController.getAllMitra,
        options: { auth: 'jwt', pre: [verifyRole(['admin', 'dosen', 'mahasiswa'])] }
    },
    {
        method: 'GET',
        path: '/{id}',
        handler: mitraController.getMitraById,
        options: { auth: 'jwt', pre: [verifyRole(['admin', 'dosen', 'mahasiswa'])] }
    },
    {
        method: 'DELETE',
        path: '/{id}',
        handler: mitraController.deleteMitra,
        options: { auth: 'jwt', pre: [verifyRole(['admin'])] }
    },
    {
        method: 'POST',
        path: '',
        handler: mitraController.createMitra,
        options: { auth: 'jwt', pre: [verifyRole(['admin'])] }
    },
    {
        method: 'PUT',
        path: '/{id}',
        handler: mitraController.updateMitra,
        options: { auth: 'jwt', pre: [verifyRole(['admin'])] }
    }
];