const { Mahasiswa } = require('../models');

const getAllMahasiswa = async (request, h) => {
    try {
        const mahasiswa = await Mahasiswa.findAll();

        if (mahasiswa.length != 0) {
            return response = h.response({
                status: 'success',
                message: 'Berhasil mengambil data',
                data: mahasiswa,
            }).code(200);
        } else {
            return response = h.response({
                status: 'error',
                message: 'Data tidak ditemukan',
                data: mahasiswa,
            }).code(200);
        }

    } catch (err) {
        console.log(err);
    }
};

const createMahasiswa = async (request, h) => {
    try {
        const { nrp, nama, jenis_kelamin, nomor_hp, alamat, jurusan } = request.payload;
        const mahasiswa = await Mahasiswa.create({ nrp, nama, jenis_kelamin, nomor_hp, alamat, jurusan });

        return response = h.response({
            status: 'Success',
            message: 'Berhasil menyimpan data',
            data: mahasiswa
        }).code(200);
        
    } catch (err) {
        console.log(err);
    }
};

const updateMahasiswa = async (request, h) => {
    try {
        const { nrp, nama, jenis_kelamin, nomor_hp, alamat, jurusan } = request.payload;
        const mahasiswa = await Mahasiswa.findByPk(request.params.id);

        if (mahasiswa) {
            await mahasiswa.update({ nrp, nama, jenis_kelamin, nomor_hp, alamat, jurusan });
            return response = h.response({
                status: 'success',
                message: 'Berhasil memperbarui data'
            }).code(200);
        } else {
            return response = h.response({
                status: 'error',
                message: 'Data tidak ditemukan'
            }).code(404);
        }

    } catch (err) {
        console.log(err);
    }
};

const deleteMahasiswa = async (request, h) => {
    try {
        const mahasiswa = await Mahasiswa.findByPk(request.params.id);

        if (mahasiswa) {
            await mahasiswa.destroy();
            return response = h.response({
                status: 'success',
                message: 'Berhasil menghapus data'
            }).code(200);
        } else {
            return response = h.response({
                status: 'error',
                message: 'Data tidak ditemukan'
            }).code(404);
        }

    } catch (err) {
        console.log(err);
    }
};

const getMahasiswaById = async (request, h) => {
    try {
        const mahasiswa = await Mahasiswa.findByPk(request.params.id);

        if (mahasiswa) {
            return response = h.response({
                status: 'success',
                message: 'Berhasil mengambil data',
                data: mahasiswa
            }).code(200);
        } else {
            return response = h.response({
                status: 'error',
                message: 'Data tidak ditemukan'
            }).code(404);
        }

    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getAllMahasiswa,
    createMahasiswa,
    updateMahasiswa,
    deleteMahasiswa,
    getMahasiswaById,
};