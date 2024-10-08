const { Mitra } = require('../models');

const getAllMitra = async (request, h) => {
    try {
        const mitra = await Mitra.findAll();

        if (mitra.length != 0) {
            return response = h.response({
                status: 'success',
                message: 'Berhasil mengambil data',
                data: mitra,
            }).code(200);
        } else {
            return response = h.response({
                status: 'success',
                message: 'Data tidak ditemukan',
                data: mitra,
            }).code(200);
        }

    } catch (err) {
        console.log(err);
    }
};

const getMitraById = async (request, h) => {
    try {
        const mitra = await Mitra.findByPk(request.params.id);

        if (mitra) {
            return response = h.response({
                status: 'success',
                message: 'Berhasil mengambil data',
                data: mitra
            }).code(200);
        } else {
            return response = h.response({
                status: 'success',
                message: 'Data tidak ditemukan'
            }).code(404);
        }

    } catch (err) {
        console.log(err);
    }
};

const deleteMitra = async (request, h) => {
    try {
        const mitra = await Mitra.findByPk(request.params.id);

        if (mitra) {
            await mitra.destroy();
            return response = h.response({
                status: 'success',
                message: 'Berhasil menghapus data'
            }).code(200);
        } else {
            return response = h.response({
                status: 'success',
                message: 'Data tidak ditemukan'
            }).code(404);
        }

    } catch (err) {
        console.log(err);
    }
}

const createMitra = async (request, h) => {
    try {
        const { nama_mitra, alamat, kota } = request.payload;
        const mitra = await Mitra.create({ nama_mitra, alamat, kota });

        return response = h.response({
            status: 'Success',
            message: 'Saved successfully',
            data: mitra
        }).code(200);
        
    } catch (err) {
        console.log(err);
    }
}

const updateMitra = async (request, h) => {
    try {
        const { nama_mitra, alamat, kota } = request.payload;
        const mitra = await Mitra.findByPk(request.params.id);

        if (mitra) {
            await mitra.update({ nama_mitra, alamat, kota });
            return response = h.response({
                status: 'success',
                message: 'Berhasil memperbarui data'
            }).code(200);
        } else {
            return response = h.response({
                status: 'success',
                message: 'Data tidak ditemukan'
            }).code(404);
        }

    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getAllMitra,
    getMitraById,
    deleteMitra,
    createMitra,
    updateMitra
}