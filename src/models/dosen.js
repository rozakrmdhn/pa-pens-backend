'use strict';

const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Dosen = sequelize.define('Dosen', {
        nip: DataTypes.STRING,
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
        Dosen.hasMany(models.Daftar, {
            foreignKey: 'id_dosen',
            as: 'daftar'
        });
    };
    return Dosen;
};