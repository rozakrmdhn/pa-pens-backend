const { where } = require("sequelize");
const { Anggota } = require("../models");

const createBulkAnggota = async (request, h) => {
    const { mahasiswaList } = request.payload;

    try {
        // Check if the length of mahasiswaList exceeds 2
        if (mahasiswaList.length > 2) {
            return h.response({
                status: 'error',
                message: 'Cannot insert more than 2 records at a time'
            }).code(400);
        }

        // Extract id_mahasiswa from mahasiswaList
        const idMahasiswaList = mahasiswaList.map(item => item.id_mahasiswa);

        const existingAnggota = await Anggota.findAll({
            where: {
                id_mahasiswa: idMahasiswaList
            }
        });

        if (existingAnggota.length > 0) {
            return h.response({
                status: 'error',
                message: 'One or more id_mahasiswa already exist in the database'
            }).code(400);

        } else {
            const insertedRecords  = await Anggota.bulkCreate(mahasiswaList, { returning: true });
            return response = h.response({
                status: 'success',
                message: 'Saved successfully',
                data: insertedRecords
            }).code(200);
        }
    
    } catch (err) {
        return response = h.response({
            status: 'Error',
            message: 'Bulk insert failed'
        }).code(500);
    }
};

const getAnggotaById = async (request, h) => {
    try {
        const result = await Anggota.findByPk(request.params.id);

        if (result) {
            return response = h.response({
                status: 'success',
                message: 'Berhasil mengambil data',
                data: result
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

const getAllAnggota = async (request, h) => {
    try {
        const results = await Anggota.findAll();

        if (results.length != 0) {
            return response = h.response({
                status: 'success',
                message: 'Berhasil mengambil data',
                data: results,
            }).code(200);
        } else {
            return response = h.response({
                status: 'success',
                message: 'Data tidak ditemukan',
                data: results,
            }).code(200);
        }

    } catch (err) {
        console.log(err);
    }
};

const getAnggotaByMahasiswa = async (request, h) => {
    // const { id_mahasiswa, id_daftar } = request.query;
    try {
        // Create the where clause based on the query parameters
        // const whereClause = {};
        // if (id_mahasiswa) {
        //     whereClause.id_daftar = request.params.id_daftar;
        //     whereClause.id_mahasiswa = request.params.id_mahasiswa;
        // }
        // if (id_daftar) {
        //     whereClause.id_daftar = request.params.id_daftar;
        //     whereClause.id_daftar = request.params.id_mahasiswa;
        // }

        // console.log(whereClause);

        // Fetch the data using the constructed where clause
        const results = await Anggota.findAll({
            // where: whereClause
            where: {
                id_daftar: request.params.id_daftar,
                id_mahasiswa: request.params.id_mahasiswa
            }
        });

        if (results.length != 0) {
            return response = h.response({
                status: 'success',
                message: 'Berhasil mengambil data',
                data: results,
            }).code(200);
        } else {
            return response = h.response({
                status: 'success',
                message: 'Data tidak ditemukan',
                data: results,
            }).code(200);
        }

    } catch (err) {
        console.log(err);
    }
};

const deleteAnggota = async (request, h) => {
    try {
        const results = await Anggota.findByPk(request.params.id);

        if (results) {
            await results.destroy();
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
};

module.exports = {
    createBulkAnggota,
    getAnggotaById,
    getAllAnggota,
    getAnggotaByMahasiswa,
    deleteAnggota,
};