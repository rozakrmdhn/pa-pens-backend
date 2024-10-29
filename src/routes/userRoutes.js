const userController = require('../controllers/userController');

module.exports = [
    {
        method: 'POST',
        path: '/signin',
        handler: userController.signIn,
        options: { auth: false },
    },
    {
        method: 'POST',
        path: '/logout',
        handler: userController.signOut,
        options: { auth: false },
    }
];