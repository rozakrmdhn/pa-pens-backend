const { where } = require('sequelize');
const { Logbook, Anggota, Daftar, Mahasiswa, Dosen } = require('../models');

const getAllLogbook = async (request, h) => {
    try {
        const results = await Logbook.findAll({
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
            }).code(400);
        }
    } catch (err) {
        console.log(err);
    }
};

const getLogbookByMahasiswa = async (request, h) => {
    const { id_mahasiswa } = request.params;
    try {
        const results = await Logbook.findAll({
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
            }).code(400);
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getAllLogbook,
    getLogbookByMahasiswa
}