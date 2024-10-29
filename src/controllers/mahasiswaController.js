const { Mahasiswa, Daftar, Anggota } = require('../models');
const { Sequelize } = require('sequelize');

const getAllMahasiswa = async (request, h) => {
    try {
        // Access user data from the decoded JWT
        const user = request.auth.credentials; // This will contain the decoded payload
        // Optionally log the user data to see what's included
        console.log('Authenticated user:', user);

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
            }).code(404);
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
            status: 'success',
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

const getSebaranMahasiswa = async (request, h) => {
    try {
        const sebaran = await Anggota.findAll({
            attributes: [
                [Sequelize.col('daftar.provinsi'), 'provinsi'],
                [Sequelize.col('daftar.kota'), 'kota'],
                [Sequelize.fn('COUNT', Sequelize.col('Anggota.id')), 'jumlah_mahasiswa']
            ],
            include: [{
                model: Daftar,
                as: 'daftar',
                attributes: [], // Tidak memerlukan atribut tambahan dari tabel Daftar selain yang dibutuhkan
            }],
            group: ['daftar.provinsi', 'daftar.kota']
        });

        if (sebaran.length != 0) {
            return response = h.response({
                status: 'success',
                message: 'Berhasil mengambil data',
                data: sebaran,
            }).code(200);
        } else {
            return response = h.response({
                status: 'error',
                message: 'Data tidak ditemukan',
                data: sebaran,
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
    getSebaranMahasiswa,
};