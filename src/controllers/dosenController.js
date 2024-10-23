const { Dosen, Daftar, Mahasiswa, Anggota } = require('../models');
const { Sequelize } = require('sequelize');

const getAllDosen = async (request, h) => {
    try {
        const dosen = await Dosen.findAll();

        if (dosen.length != 0) {
            return response = h.response({
                status: 'success',
                message: 'Berhasil mengambil data',
                data: dosen,
            }).code(200);
        } else {
            return response = h.response({
                status: 'success',
                message: 'Data tidak ditemukan',
                data: dosen,
            }).code(200);
        }

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

const plotingDosenList = async (request, h) => {
    try {
        const dosen = await Daftar.findAll({
            // raw: true,
            attributes: [
                'id_dosen',  // Include id_dosen to group by it
                [Sequelize.fn('COUNT', Sequelize.col('id_dosen')), 'alokasi_dosbim'], // Count of entries per dosen
            ],
            include: [
                {
                    model: Dosen,
                    as: 'dosen',
                    attributes: ['id', 'nama']  // Fetching id and nama from Dosen
                }
            ],
            group: ['id_dosen', 'dosen.id', 'dosen.nama'], // Grouping by id_dosen and including necessary fields
        });

        const result = await Dosen.findAll({
            attributes: {
                include: [
                    // First subquery: Count from 'daftar' table
                    [
                        Sequelize.literal(`
                            (SELECT COUNT(*)
                            FROM daftar AS dr 
                            WHERE dr.id_dosen = "Dosen"."id")
                        `),
                        'jumlah_mitra', // Alias for count from 'daftar' table
                    ],
                    // Second subquery: Count from 'anggota' table
                    [
                        Sequelize.literal(`
                            (SELECT COUNT(*)
                            FROM anggota AS ag
                            JOIN daftar AS dr ON ag.id_daftar = dr.id
                            WHERE dr.id_dosen = "Dosen"."id")
                        `),
                        'jumlah_mahasiswa' // Alias for count from 'anggota' table
                    ]
                ]
            },
            order: [
                [Sequelize.literal(`(SELECT COUNT(*) FROM daftar AS dr WHERE dr.id_dosen = "Dosen"."id")`), 'DESC']
            ]
        });


        if (result.length != 0) {
            return response = h.response({
                status: 'success',
                message: 'Berhasil mengambil data',
                data: result,
            }).code(200);
        } else {
            return response = h.response({
                status: 'success',
                message: 'Data tidak ditemukan',
                data: result,
            }).code(200);
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
    updateDosen,
    plotingDosenList
}