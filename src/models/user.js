'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING,
        id_mahasiswa: DataTypes.INTEGER,
        id_dosen: DataTypes.INTEGER,
        nama: DataTypes.STRING
    }, {
        tableName: 'users',
        timestamps: true,
    });

    User.associate = function(models) {
        User.belongsTo(models.Mahasiswa, {
            foreignKey: 'id_mahasiswa',
            as: 'mahasiswa'
        });
        User.belongsTo(models.Dosen, {
            foreignKey: 'id_dosen',
            as: 'dosen'
        });
    };

    return User;
};