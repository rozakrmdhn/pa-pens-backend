'use strict';

const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Mitra = sequelize.define('Mitra', {
        nama_mitra: DataTypes.STRING,
        alamat: DataTypes.STRING,
        kota: DataTypes.STRING
    }, {
        tableName: 'mitra',
        timestamps: true,
    });
    Mitra.associate = function(models) {

    };
    return Mitra;
};