'use strict';

const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Dosen = sequelize.define('Dosen', {
        nip: DataTypes.INTEGER,
        nama: DataTypes.STRING,
        jenis_kelamin: DataTypes.STRING,
        email: DataTypes.STRING,
        nomor_hp: DataTypes.STRING,
        alamat: DataTypes.STRING
    }, {
        tableName: 'dosen',
        timestamps: true,
    });
    Dosen.associate = function(models) {

    };
    return Dosen;
};