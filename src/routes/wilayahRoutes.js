const wilayahController = require('../controllers/wilayahController');

module.exports = [
    {
        method: 'GET',
        path: '/provinces',
        handler: wilayahController.getProvinces
    },
    {
        method: 'POST',
        path: '/regencies',
        handler: wilayahController.getRegencies
    }
];