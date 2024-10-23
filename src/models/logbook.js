'use strict';

const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Logbook = sequelize.define('Logbook', {
        id_anggota: DataTypes.INTEGER,
        tanggal: DataTypes.DATE,
        jam_mulai: DataTypes.TIME,
        jam_selesai: DataTypes.TIME,
        kegiatan: DataTypes.STRING,
        kesesuaian_matkul_diajarkan: DataTypes.STRING,
        matkul_diajarkan: DataTypes.STRING,
        setujui_logbook: DataTypes.INTEGER,
        lampiran_laporan: DataTypes.STRING,
        lampiran_foto: DataTypes.STRING,
        catatan_pembimbing: DataTypes.STRING
    }, {
        tableName: 'logbook',
        timestamps: true,
    });
    Logbook.associate = function(models) {
        Logbook.belongsTo(models.Anggota, {
            foreignKey: 'id_anggota',
            as: 'anggota'
        });
    };
    return Logbook;
};