'use strict';

const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Anggota = sequelize.define('Anggota', {
        id_mahasiswa: DataTypes.INTEGER,
        id_daftar: DataTypes.INTEGER
    }, {
        tableName: 'anggota',
        timestamps: true,
    });
    Anggota.associate = function(models) {
        Anggota.belongsTo(models.Daftar, { foreignKey: 'id_daftar', as: 'daftar' });
        Anggota.belongsTo(models.Mahasiswa, {
            foreignKey: 'id_mahasiswa',
            as: 'mahasiswa'
        });
    };
    return Anggota;
};