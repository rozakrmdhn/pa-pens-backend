'use strict';

const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Anggota = sequelize.define('Anggota', {
        id_mahasiswa: DataTypes.INTEGER,
        id_daftar: DataTypes.INTEGER
    }, {
        tableName: 'anggota',
        timestamps: true,
    });
    Anggota.associate = function(models) {

    };
    return Anggota;
};