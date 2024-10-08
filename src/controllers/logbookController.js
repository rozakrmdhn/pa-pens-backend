const { Logbook } = require('../models');

const getAllLogbook = async (request, h) => {
    try {
        const results = await Logbook.findAll();
    } catch (err) {
        console.log(err);
    }
};

module.exports = {

}