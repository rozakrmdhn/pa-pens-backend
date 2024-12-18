'use strict';

const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Daftar = sequelize.define('Daftar', {
        lama_kp: DataTypes.STRING,
        tempat_kp: DataTypes.STRING,
        alamat: DataTypes.STRING,
        provinsi: DataTypes.STRING,
        kota: DataTypes.STRING,
        tanggal_kp: DataTypes.DATE,
        status_persetujuan: DataTypes.INTEGER,
        status_dokumen: DataTypes.INTEGER,
        catatan_koordinator_kp: DataTypes.STRING,
        id_mahasiswa: DataTypes.INTEGER,
        id_dosen: DataTypes.INTEGER,
        bulan: DataTypes.INTEGER,
        tahun: DataTypes.INTEGER,

    }, {
        tableName: 'daftar',
        timestamps: true,
    });
    Daftar.associate = function(models) {
        Daftar.belongsTo(models.Mahasiswa, {
            foreignKey: 'id_mahasiswa',
            as: 'mahasiswa'
        });
        Daftar.belongsTo(models.Dosen, {
            foreignKey: 'id_dosen',
            as: 'dosen'
        });
    };
    
    return Daftar;
};