const wilayahController = require('../controllers/wilayahController');

module.exports = [
    {
        method: 'GET',
        path: '/provinces',
        handler: wilayahController.getProvinces,
        options: { auth: false }
    },
    {
        method: 'POST',
        path: '/regencies',
        handler: wilayahController.getRegencies,
        options: { auth: false }
    }
];