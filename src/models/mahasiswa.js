'use strict';

const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Mahasiswa = sequelize.define('Mahasiswa', {
        nrp: DataTypes.STRING,
        nama: DataTypes.STRING,
        jenis_kelamin: DataTypes.STRING,
        nomor_hp: DataTypes.STRING,
        alamat: DataTypes.STRING,
        jurusan: DataTypes.STRING
    }, {
        tableName: 'mahasiswa',
        timestamps: true,
    });
    Mahasiswa.associate = function(models) {

    };
    return Mahasiswa;
};