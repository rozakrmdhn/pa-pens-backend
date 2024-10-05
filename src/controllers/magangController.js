const { Daftar, Mahasiswa } = require('../models');

const getAllPengajuan = async (request, h) => {
    try {
        const pengajuan = await Daftar.findAll({
            include: [
                {
                    model: Mahasiswa,
                    as: 'mahasiswa',
                    attributes: ['nrp','nama']
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        if (pengajuan.length != 0) {
            return response = h.response({
                status: 'success',
                message: 'Berhasil mengambil data',
                data: pengajuan,
            }).code(200);
        } else {
            return response = h.response({
                status: 'success',
                message: 'Data tidak ditemukan',
                data: pengajuan,
            }).code(200);
        }

    } catch (err) {
        console.log(err);
    }
}

const getPengajuanById = async (request, h) => {
    try {
        const pengajuan = await Daftar.findByPk(request.params.id);

        if (pengajuan) {
            return response = h.response({
                status: 'success',
                message: 'Berhasil mengambil data',
                data: pengajuan
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

const updatePengajuan = async (request, h) => {
    try {
        const { lama_kp, tempat_kp, alamat, kota } = request.payload;
        const daftar = await Daftar.findByPk(request.params.id);

        if (daftar) {
            await daftar.update({ lama_kp, tempat_kp, alamat, kota });
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

const createPengajuan = async (request, h) => {
    try {
        const { lama_kp, tempat_kp, alamat, kota } = request.payload;
        const daftar = await Daftar.create({ lama_kp, tempat_kp, alamat, kota });

        return response = h.response({
            status: 'Success',
            message: 'Saved successfully',
            data: daftar
        }).code(200);

    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createPengajuan,
    getAllPengajuan,
    getPengajuanById,
    updatePengajuan
};