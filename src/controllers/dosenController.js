const pool = require('../config/config');
const { Dosen } = require('../models');

const getAllDosen = async (request, h) => {
    try {
        const dosen = await Dosen.findAll();

        return response = h.response({
            status: 'success',
            message: 'Berhasil mengambil data',
            data: dosen,
        }).code(200);

    } catch (err) {
        console.log(err);
    }
};

const getDosenById = async (request, h) => {
    try {
        const dosen = await Dosen.findByPk(request.params.id);

        if (dosen) {
            return response = h.response({
                status: 'success',
                message: 'Berhasil mengambil data',
                data: dosen
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

const deleteDosen = async (request, h) => {
    try {
        const dosen = await Dosen.findByPk(request.params.id);

        if (dosen) {
            await dosen.destroy();
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

const createDosen = async (request, h) => {
    try {
        const { nip, nama, jenis_kelamin, email, nomor_hp, alamat } = request.payload;
        const dosen = await Dosen.create({ nip, nama, jenis_kelamin, email, nomor_hp, alamat });

        return response = h.response({
            status: 'Success',
            message: 'Saved successfully',
            data: dosen
        }).code(200);
        
    } catch (err) {
        console.log(err);
    }
}

const updateDosen = async (request, h) => {
    try {
        const { nip, nama, jenis_kelamin, email, nomor_hp, alamat } = request.payload;
        const dosen = await Dosen.findByPk(request.params.id);

        if (dosen) {
            await dosen.update({ nip, nama, jenis_kelamin, email, nomor_hp, alamat });
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
    getAllDosen,
    getDosenById,
    deleteDosen,
    createDosen,
    updateDosen
}