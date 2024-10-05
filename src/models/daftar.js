'use strict';

const { DataTypes } = require("sequelize");
const { sequelize, Mahasiswa } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Daftar = sequelize.define('Daftar', {
        lama_kp: DataTypes.STRING,
        tempat_kp: DataTypes.STRING,
        alamat: DataTypes.STRING,
        kota: DataTypes.STRING,
        id_mahasiswa: DataTypes.INTEGER,
    }, {
        tableName: 'daftar',
        timestamps: true,
    });
    Daftar.associate = function(models) {
        Daftar.belongsTo(models.Mahasiswa, {
            foreignKey: 'id_mahasiswa',
            as: 'mahasiswa'
        });
    };
    return Daftar;
};