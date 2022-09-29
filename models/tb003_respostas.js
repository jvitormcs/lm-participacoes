const { DataTypes } = require('sequelize')

const db = require('../db/conn')
const Tb002_pergunta = require('./tb002_perguntas')

const Tb003_respostas = db.define('tb003_respostas',{

    id_respostas:{
        type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
    id_pergunta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        require: true,
    },
    resposta:{
        type: DataTypes.STRING(200),
        allowNull: false,
        require: true,
    }

}, {timestamps: false, freezeTableName: true})


Tb003_respostas.belongsTo(Tb002_pergunta, {
    constraints: true,
    foreignKey: 'id_pergunta',
    foreignKeyConstraint: 'id_pergunta'
})

Tb002_pergunta.hasOne(Tb003_respostas, {
    constraints: true,
    foreignKey: 'id_pergunta',
    foreignKeyConstraint: 'id_pergunta'
})

module.exports = Tb003_respostas