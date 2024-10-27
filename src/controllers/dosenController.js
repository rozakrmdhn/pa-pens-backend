const { Dosen, Daftar, Mahasiswa, Anggota } = require('../models');
const { Sequelize } = require('sequelize');
const Joi = require('joi');

const dosenSchema = Joi.object({
    nip: Joi.string().pattern(/^[0-9]+$/).min(18).max(18).required().label('NIP'),
    nama: Joi.string().required().label('Nama'),
    jenis_kelamin: Joi.string().valid('Laki-Laki', 'Perempuan').required().label('Jenis Kelamin'),
    email: Joi.string().email().required().label('Email'),
    nomor_hp: Joi.string().pattern(/^[0-9]+$/).min(10).max(13).required().label('Nomor HP'),
    alamat: Joi.string().required().label('Alamat')
});

const validateCreateDosen = async (request, h) => {
    const { error } = dosenSchema.validate(request.payload, { abortEarly: false });

    if (error) {
        const errorMessage = error.details[0].message;
        const errorMessages__ = error.details.map(detail => detail.message);
        const errorMessages = error.details.reduce((acc, detail) => {
            const key = detail.context.key;
            acc[key] = detail.message;
            return acc;
        }, {});

        return h.response({
            status: 'error',
            message: 'Validasi Gagal',
            errors: errorMessages
        }).code(400);
    }
    return null; // Lanjutkan jika tidak ada error
};

const validateUpdateDosen = async (request, h) => {
    const { error } = dosenSchema.validate(request.payload, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.reduce((acc, detail) => {
            const key = detail.context.key;
            acc[key] = detail.message;
            return acc;
        }, {});

        return h.response({
            status: 'error',
            message: 'Validasi Gagal',
            errors: errorMessages
        }).code(400);
    }
    return null; // Lanjutkan jika tidak ada error
};

const getAllDosen = async (request, h) => {
    try {
        const dosen = await Dosen.findAll({
            order: [['nama', 'ASC']]
        });

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
    const validationError = await validateCreateDosen(request, h);
    if (validationError) return validationError;

    try {
        const { nip, nama, jenis_kelamin, email, nomor_hp, alamat } = request.payload;

        // Cek duplikat email
        const existingDosen = await Dosen.findOne({ where: { email } });
        if (existingDosen) {
            return h.response({
                status: 'fail',
                message: 'Email sudah terdaftar',
                errors: { email: 'Email sudah terdaftar' } // Error khusus untuk email duplikat
            }).code(400);
        }

        // Buat data dosen jika email tidak duplikat
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
    const validationError = await validateUpdateDosen(request, h);
    if (validationError) return validationError;

    try {
        const { nip, nama, jenis_kelamin, email, nomor_hp, alamat } = request.payload;

        // Cek duplikat email
        const existingDosen = await Dosen.findOne({ where: { email } });
        if (existingDosen) {
            return h.response({
                status: 'error',
                message: 'Email sudah terdaftar',
                errors: { email: 'Email sudah terdaftar' } // Error khusus untuk email duplikat
            }).code(400);
        }

        // Update data dosen jika email tidak duplikat
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