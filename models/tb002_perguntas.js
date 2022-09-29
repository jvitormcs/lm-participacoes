const { DataTypes } = require('sequelize')

const db = require('../db/conn')


const Tb002_perguntas = db.define('tb002_perguntas',{

    id_perguntas:{
        type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
    pergunta: {
        type: DataTypes.STRING(220),
        allowNull: false,
        require: true,
    },

}, {timestamps: false, freezeTableName: true})


module.exports = Tb002_perguntas