'use strict';

const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Daftar = sequelize.define('Daftar', {
        lama_kp: DataTypes.STRING,
        tempat_kp: DataTypes.STRING,
        alamat: DataTypes.STRING,
        kota: DataTypes.STRING,
        // tanggal_kp: DataTypes.DATE,
        // status_persetujuan: DataTypes.INTEGER,
        // status_dokumen: DataTypes.INTEGER,
        // catatan_koordinator_kp: DataTypes.STRING,
        // id_mahasiswa: DataTypes.INTEGER,
        // id_dosen: DataTypes.INTEGER
    }, {
        tableName: 'daftar',
        timestamps: true,
    });
    Daftar.associate = function(models) {

    };
    return Daftar;
};