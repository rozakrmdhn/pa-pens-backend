const { where, Op, fn, col, literal } = require('sequelize');
const { Logbook, Anggota, Daftar, Mahasiswa, Dosen } = require('../models');

const createLogbook = async (request, h) => {
    const {
        id_mahasiswa,
        tanggal, 
        jam_mulai, 
        jam_selesai, 
        kegiatan, 
        kesesuaian_matkul_diajarkan, 
        matkul_diajarkan,
        setujui_logbook,
        lampiran_laporan,
        lampiran_foto } = request.payload;

    try {
        const cekAnggota = await Anggota.findAll({
            attributes: ['id', 'id_mahasiswa'],
            include: [
                {
                    model: Daftar,
                    as: 'daftar',
                    attributes: ['status_persetujuan'],
                    where: {
                        status_persetujuan: 1
                    }
                }
            ],
            where: {
                id_mahasiswa: id_mahasiswa
            }
        });

        if (cekAnggota.length === 1) {
            const id_anggota = cekAnggota[0].id;
            const logbook = await Logbook.create({
                id_anggota, 
                tanggal, 
                jam_mulai, 
                jam_selesai, 
                kegiatan, 
                kesesuaian_matkul_diajarkan, 
                matkul_diajarkan,
                setujui_logbook,
                lampiran_laporan,
                lampiran_foto
            });

            return response = h.response({
                status: 'success',
                message: 'Berhasil menyimpan data',
                data: logbook
            }).code(200);
        }

    } catch (err) {
        console.log(err);
    }
};

const getAllLogbook = async (request, h) => {
    try {
        const results = await Logbook.findAll({
            order: [['tanggal', 'ASC']],
            include: [
                { 
                    model: Anggota, 
                    as: 'anggota', 
                    attributes: ['id_mahasiswa', 'id_daftar'],
                    include: [
                        {
                            model: Daftar,
                            as: 'daftar',
                            attributes: ['tempat_kp', 'alamat', 'kota', 'tanggal_kp'],
                            include: [
                                {
                                    model: Dosen,
                                    as: 'dosen',
                                    attributes: ['id','nip','nama']
                                }
                            ]
                        },
                        {
                            model: Mahasiswa,
                            as: 'mahasiswa',
                            attributes: ['id','nrp','nama'],
                        },
                    ],
                }
            ],
        });

        // Formatting of the response data
        const formattedResults = results.map(logbook => ({
            id: logbook.id,
            id_mahasiswa: logbook.anggota.mahasiswa.id,
            nama: logbook.anggota.mahasiswa.nama,
            id_dosen: logbook.anggota.daftar.dosen.id,
            dosen_pembimbing: logbook.anggota.daftar.dosen.nama,
            tanggal: logbook.tanggal,
            jam_mulai: logbook.jam_mulai,
            jam_selesai: logbook.jam_selesai,
            kegiatan: logbook.kegiatan,
            kesesuaian_matkul_diajarkan: logbook.kesesuaian_matkul_diajarkan,
            matkul_diajarkan: logbook.matkul_diajarkan,
            setujui_logbook: logbook.setujui_logbook,
            lampiran_laporan: logbook.lampiran_laporan,
            lampiran_foto: logbook.lampiran_foto,
            catatan_pembimbing: logbook.catatan_pembimbing,
            createdAt: logbook.createdAt,
            updatedAt: logbook.updatedAt
        }));

        if (results.length != 0) {
            return response = h.response({
                status: 'success',
                message: 'Berhasil mengambil data',
                data: formattedResults
            }).code(200);
        } else {
            return response = h.response({
                status: 'success',
                message: 'Data Logbook tidak ditemukan',
                data: formattedResults,
            }).code(404);
        }
    } catch (err) {
        console.log(err);
    }
};

const getLogbookByMahasiswa = async (request, h) => {
    const { id_mahasiswa } = request.params;
    try {
        const results = await Logbook.findAll({
            order: [['tanggal', 'ASC']],
            include: [
                { 
                    model: Anggota, 
                    as: 'anggota', 
                    attributes: ['id_mahasiswa', 'id_daftar'],
                    include: [
                        {
                            model: Daftar,
                            as: 'daftar',
                            attributes: ['tempat_kp', 'alamat', 'kota', 'tanggal_kp'],
                            include: [
                                {
                                    model: Dosen,
                                    as: 'dosen',
                                    attributes: ['id','nip','nama']
                                }
                            ]
                        },
                        {
                            model: Mahasiswa,
                            as: 'mahasiswa',
                            attributes: ['id','nrp','nama'],
                        },
                    ],
                    where: { id_mahasiswa: id_mahasiswa }
                }
            ],
        });

        // Formatting of the response data
        const formattedResults = results.map(logbook => ({
            id: logbook.id,
            id_mahasiswa: logbook.anggota.mahasiswa.id,
            nama: logbook.anggota.mahasiswa.nama,
            id_dosen: logbook.anggota.daftar.dosen.id,
            dosen_pembimbing: logbook.anggota.daftar.dosen.nama,
            tanggal: logbook.tanggal,
            jam_mulai: logbook.jam_mulai,
            jam_selesai: logbook.jam_selesai,
            kegiatan: logbook.kegiatan,
            kesesuaian_matkul_diajarkan: logbook.kesesuaian_matkul_diajarkan,
            matkul_diajarkan: logbook.matkul_diajarkan,
            setujui_logbook: logbook.setujui_logbook,
            lampiran_laporan: logbook.lampiran_laporan,
            lampiran_foto: logbook.lampiran_foto,
            catatan_pembimbing: logbook.catatan_pembimbing,
            createdAt: logbook.createdAt,
            updatedAt: logbook.updatedAt
        }));

        if (results.length != 0) {
            return response = h.response({
                status: 'success',
                message: 'Berhasil mengambil data',
                data: formattedResults
            }).code(200);
        } else {
            return response = h.response({
                status: 'success',
                message: 'Data Logbook tidak ditemukan',
                data: formattedResults,
            }).code(404);
        }
    } catch (err) {
        console.log(err);
    }
};

const getLogbookMahasiswa = async (request, h) => {
    const { id_mahasiswa } = request.payload;
    try {
        const results = await Logbook.findAll({
            order: [['tanggal', 'ASC']],
            include: [
                { 
                    model: Anggota, 
                    as: 'anggota', 
                    attributes: ['id_mahasiswa', 'id_daftar'],
                    include: [
                        {
                            model: Daftar,
                            as: 'daftar',
                            attributes: ['tempat_kp', 'alamat', 'kota', 'tanggal_kp'],
                            include: [
                                {
                                    model: Dosen,
                                    as: 'dosen',
                                    attributes: ['id','nip','nama']
                                }
                            ]
                        },
                        {
                            model: Mahasiswa,
                            as: 'mahasiswa',
                            attributes: ['id','nrp','nama'],
                        },
                    ],
                    where: { id_mahasiswa: id_mahasiswa }
                }
            ],
        });

        // Formatting of the response data
        const formattedResults = results.map(logbook => ({
            id: logbook.id,
            id_mahasiswa: logbook.anggota.mahasiswa.id,
            nama: logbook.anggota.mahasiswa.nama,
            id_dosen: logbook.anggota.daftar.dosen.id,
            dosen_pembimbing: logbook.anggota.daftar.dosen.nama,
            tanggal: logbook.tanggal,
            jam_mulai: logbook.jam_mulai,
            jam_selesai: logbook.jam_selesai,
            kegiatan: logbook.kegiatan,
            kesesuaian_matkul_diajarkan: logbook.kesesuaian_matkul_diajarkan,
            matkul_diajarkan: logbook.matkul_diajarkan,
            setujui_logbook: logbook.setujui_logbook,
            lampiran_laporan: logbook.lampiran_laporan,
            lampiran_foto: logbook.lampiran_foto,
            catatan_pembimbing: logbook.catatan_pembimbing,
            createdAt: logbook.createdAt,
            updatedAt: logbook.updatedAt
        }));

        if (results.length != 0) {
            return response = h.response({
                status: 'success',
                message: 'Berhasil mengambil data',
                data: formattedResults
            }).code(200);
        } else {
            return response = h.response({
                status: 'success',
                message: 'Data Logbook tidak ditemukan',
                data: formattedResults,
            }).code(404);
        }
    } catch (err) {
        console.log(err);
    }
};

const createLogbookMonitoring = async (request, h) => {
    try {
        const { catatan_pembimbing } = request.payload;
        const logbook = await Logbook.findByPk(request.params.id);

        if (logbook) {
            await logbook.update({ catatan_pembimbing });
            return response = h.response({
                status: 'success',
                message: 'Berhasil melakukan monitoring'
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

const deleteLogbook = async (request, h) => {
    try {
        const logbook = await Logbook.findByPk(request.params.id);
        if (logbook) {
            await logbook.destroy();
            return response = h.response({
                status: 'success',
                message: 'Berhasil menghapus data logbook'
            }).code(200);
        } else {
            return response = h.response({
                status: 'success',
                message: 'Data logbook tidak ditemukan'
            }).code(404);
        }

    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    createLogbook,
    getAllLogbook,
    getLogbookByMahasiswa,
    getLogbookMahasiswa,
    createLogbookMonitoring,
    deleteLogbook
}