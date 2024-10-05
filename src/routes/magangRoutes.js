const magangController = require('../controllers/magangController');

module.exports = [
    {
        method: 'POST',
        path: '/pengajuan',
        handler: magangController.createPengajuan
    },
    {
        method: 'PUT',
        path: '/pengajuan/{id}',
        handler: magangController.updatePengajuan
    },
    {
        method: 'GET',
        path: '',
        handler: magangController.getAllPengajuan
    },
    {
        method: 'GET',
        path: '/pengajuan/{id}',
        handler: magangController.getPengajuanById
    }
];