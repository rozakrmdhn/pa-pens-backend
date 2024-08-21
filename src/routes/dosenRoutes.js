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
        path: '/dosen', 
        handler: getAllDosen,
    },
    {
        method: 'GET',
        path: '/dosen/{id}',
        handler: getDosenById,
    },
    {
        method: 'DELETE',
        path: '/dosen/{id}',
        handler: deleteDosen,
    },
    {
        method: 'POST',
        path: '/dosen',
        handler: createDosen,
    },
    {
        method: 'PUT',
        path: '/dosen/{id}',
        handler: updateDosen,
    }
];

module.exports = routes;