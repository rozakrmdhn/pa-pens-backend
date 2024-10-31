const Boom = require('@hapi/boom');

const verifyRole = (allowedRoles) => {
    return (request, h) => {
        const { user } = request.auth.credentials;

        if(!allowedRoles.includes(user.role)) {
            throw Boom.forbidden(`You don't have permission to access this resource.`);
        }

        return h.continue;
    };
};

module.exports = verifyRole;