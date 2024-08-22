const {
    getAllDosen,
    getDosenById,
    deleteDosen,
    createDosen,
    updateDosen,
} = require('../controllers/dosenController');

const routes = [
    {
        method: 'GET', 
        path: '', 
        handler: getAllDosen,
    },
    {
        method: 'GET',
        path: '/{id}',
        handler: getDosenById,
    },
    {
        method: 'DELETE',
        path: '/{id}',
        handler: deleteDosen,
    },
    {
        method: 'POST',
        path: '',
        handler: createDosen,
    },
    {
        method: 'PUT',
        path: '/{id}',
        handler: updateDosen,
    }
];

module.exports = routes;