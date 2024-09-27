'use strict';

const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Dosen = sequelize.define('Dosen', {
        nama: DataTypes.STRING,
        kelamin: DataTypes.STRING,
        email: DataTypes.STRING,
        no_hp: DataTypes.STRING,
        alamat: DataTypes.STRING
    }, {
        tableName: 'dosen',
        timestamps: true,
    });
    Dosen.associate = function(models) {

    };
    return Dosen;
};