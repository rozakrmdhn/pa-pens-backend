const { Daftar, Mahasiswa, Dosen, Anggota, Province } = require('../models');

/* FITUR PENDAFTARAN KP ["role"="mahasiswa"] */
const getAllPengajuan = async (request, h) => {
    try {
        const pengajuan = await Daftar.findAll({
            include: [
                {
                    model: Mahasiswa,
                    as: 'mahasiswa',
                    attributes: ['nrp', 'nama']
                },
                {
                    model: Dosen,
                    as: 'dosen',
                    attributes: ['nip', 'nama']
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
                message: 'Data Pengajuan tidak ditemukan',
                data: pengajuan,
            }).code(400);
        }

    } catch (err) {
        console.log(err);
    }
};

const getPengajuanById = async (request, h) => {
    try {
        const pengajuan = await Daftar.findByPk(request.params.id, {
            raw: true,
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
                message: 'Data Pengajuan tidak ditemukan'
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
            },
            include: [
                { model: Mahasiswa, as: 'mahasiswa', attributes: ['nrp', 'nama'] }
            ],
        });

        if (results.length != 0) {
            return response = h.response({
                status: 'success',
                message: 'Berhasil mengambil data',
                data: results,
            }).code(200);
        } else {
            return response = h.response({
                status: 'error',
                message: 'Data Anggota tidak ditemukan',
                data: results,
            }).code(400);
        }

    } catch (err) {
        console.log(err);
    }
};

const updatePengajuan = async (request, h) => {
    try {
        const { lama_kp, tempat_kp, alamat, provinsi, kota, tanggal_kp, bulan, tahun } = request.payload;
        const daftar = await Daftar.findByPk(request.params.id);

        if (daftar) {
            await daftar.update({ lama_kp, tempat_kp, alamat, provinsi, kota, tanggal_kp, bulan, tahun });
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
    const { lama_kp, tempat_kp, alamat, provinsi, kota, tanggal_kp, id_mahasiswa, bulan, tahun } = request.payload;
    try {
        const cekAnggota = await Anggota.findAll({
            where: {
                id_mahasiswa: id_mahasiswa
            }
        });

        if (cekAnggota.length === 0) {
            const daftar = await Daftar.create({ lama_kp, tempat_kp, alamat, provinsi, kota, tanggal_kp, id_mahasiswa, bulan, tahun });
            
            await Anggota.create({ 
                id_mahasiswa: daftar.id_mahasiswa,
                id_daftar: daftar.id
            });

            return response = h.response({
                status: 'success',
                message: 'Berhasil menyimpan data',
                data: daftar
            }).code(200);

        } else {
            return h.response({
                status: 'error',
                message: 'Data already exists for this mahasiswa.',
            }).code(400);
        }

    } catch (err) {
        console.log(err);
    }
};

/* FITUR VERIFIKASI KP ["role"="koordinator_kp"] */
const verifikasiPengajuan = async (request, h) => {
    try {
        const { status_persetujuan, catatan_koordinator_kp, tanggal_kp } = request.payload;
        const verifikasi = await Daftar.findByPk(request.params.id);

        if (verifikasi) {
            // Update record with new verification data
            await verifikasi.update({ status_persetujuan, catatan_koordinator_kp, tanggal_kp });

            return h.response({
                status: 'success',
                message: 'Pengajuan berhasil diverifikasi',
            }).code(200);
        } else {
            // Return 404 if the record is not found
            return h.response({
                status: 'error',
                message: 'Data tidak ditemukan',
            }).code(404);
        }

    } catch (err) {
        // Log the detailed error for debugging purposes
        console.error('Error during verification process:', err);

        // Return a detailed error response for the client
        return h.response({
            status: 'error',
            message: 'Internal server error occurred during verifikasi process',
        }).code(500);
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
                status: 'error',
                message: 'Data tidak ditemukan'
            }).code(404);
        }

    } catch (err) {
        console.log(err);
    }
};

const getAllPengajuanAggregate = async (request, h) => {
    try {
        const provinceResponse = await fetch(`https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json`);
        const provinceData = await provinceResponse.json();
        const provinceMap = provinceData.reduce((acc, province) => {
            acc[province.id] = province.name;
            return acc;
        }, {});

        // Cache untuk kota
        const regencyCache = {};

        const pengajuan = await Daftar.findAll({
            include: [
                {
                    model: Mahasiswa,
                    as: 'mahasiswa',
                    attributes: ['nrp', 'nama']
                },
                {
                    model: Dosen,
                    as: 'dosen',
                    attributes: ['nip', 'nama']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        // Fungsi untuk mengambil nama kota dengan caching
        async function fetchRegencyName(regencyId) {
            if (regencyCache[regencyId]) {
                return regencyCache[regencyId]; // Mengambil dari cache jika ada
            }

            const regencyResponse = await fetch(`https://emsifa.github.io/api-wilayah-indonesia/api/regency/${regencyId}.json`);
            const regencyData = await regencyResponse.json();

            regencyCache[regencyId] = regencyData.name; // Simpan hasil di cache
            return regencyData.name; // Kembalikan nama kota
        }

        const combineDataPromises = pengajuan.map(async (data) => {
            const regencyName = await fetchRegencyName(data.regency_id);

            return {
                id: data.id,
                lama_kp: data.lama_kp,
                tempat_kp: data.tempat_kp,
                tanggal_kp: data.tanggal_kp,
                status_persetujuan: data.status_persetujuan,
                catatan_koordinator_kp: data.catatan_koordinator_kp,
                id_mahasiswa: data.id_mahasiswa,
                id_dosen: data.id_dosen,
                mahasiswa: data.mahasiswa,
                dosen: data.dosen,
                provinsi: provinceMap[data.province_id] || 'Provinsi tidak ditemukan',
                kota: regencyName || 'Kota tidak ditemukan'
            };
        });

        // Menunggu semua promise selesai sebelum menggabungkan data akhir
        const combineData = await Promise.all(combineDataPromises);

        if (pengajuan.length != 0) {
            return response = h.response({
                status: 'success',
                message: 'Berhasil mengambil data',
                data: pengajuan,
            }).code(200);
        } else {
            return response = h.response({
                status: 'success',
                message: 'Data Pengajuan tidak ditemukan',
                data: pengajuan,
            }).code(400);
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