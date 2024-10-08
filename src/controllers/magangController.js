const { Daftar, Mahasiswa, Dosen, Anggota } = require('../models');

/* FITUR PENDAFTARAN KP ["role"="mahasiswa"] */
const getAllPengajuan = async (request, h) => {
    try {
        const pengajuan = await Daftar.findAll({
            include: [
                {
                    model: Mahasiswa,
                    as: 'mahasiswa',
                    attributes: ['nrp','nama']
                },
                {
                    model: Dosen,
                    as: 'dosen',
                    attributes: ['nip','nama']
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
};

const getPengajuanById = async (request, h) => {
    try {
        const pengajuan = await Daftar.findByPk(request.params.id, {
            include: [
                {
                    model: Mahasiswa,
                    as: 'mahasiswa',
                    attributes: ['nrp','nama']
                },
                {
                    model: Dosen,
                    as: 'dosen',
                    attributes: ['nip','nama']
                }
            ],
        });

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

const getAnggotaByPengajuan = async (request, h) => {
    try {
        const results = await Anggota.findAll({
            where: {
                id_daftar: request.params.id
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

const updatePengajuan = async (request, h) => {
    try {
        const { lama_kp, tempat_kp, alamat, kota, tanggal_kp } = request.payload;
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
};

const createPengajuan = async (request, h) => {
    try {
        const { lama_kp, tempat_kp, alamat, kota, tanggal_kp } = request.payload;
        const daftar = await Daftar.create({ lama_kp, tempat_kp, alamat, kota, tanggal_kp });

        return response = h.response({
            status: 'Success',
            message: 'Saved successfully',
            data: daftar
        }).code(200);

    } catch (err) {
        console.log(err);
    }
};

/* FITUR VERIFIKASI KP ["role"="koordinator_kp"] */
const verifikasiPengajuan = async (request, h) => {
    try {
        const { status_persetujuan } = request.payload;
        const verifikasi = await Daftar.findByPk(request.params.id);

        if (verifikasi) {
            await verifikasi.update({ status_persetujuan });
            return response = h.response({
                status: 'success',
                message: 'Pengajuan berhasil diverifikasi'
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

const plotingDosbim = async (request, h) => {
    try {
        const { id_dosen } = request.payload;
        const ploting = await Daftar.findByPk(request.params.id);

        if(ploting) {
            await ploting.update({ id_dosen });
            return response = h.response({
                status: 'success',
                message: 'Ploting berhasil disimpan'
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
    createPengajuan,
    getAllPengajuan,
    getPengajuanById,
    updatePengajuan,
    verifikasiPengajuan,
    plotingDosbim,
    getAnggotaByPengajuan
};