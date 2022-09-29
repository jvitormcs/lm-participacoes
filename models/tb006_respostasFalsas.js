const { DataTypes } = require('sequelize')

const db = require('../db/conn')
const Tb002_pergunta = require('./tb002_perguntas')

const Tb006_respostasFalsas = db.define('tb006_respostasFalsas',{

    id_falsas:{
        type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
    id_pergunta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        require: true,
    },
    resposta_falsa:{
        type: DataTypes.STRING(200),
        allowNull: false,
        require: true,
    }

}, {timestamps: false, freezeTableName: true})


Tb006_respostasFalsas.belongsTo(Tb002_pergunta, {
    constraints: true,
    foreignKey: 'id_pergunta',
    foreignKeyConstraint: 'id_pergunta'
})

Tb002_pergunta.hasOne(Tb006_respostasFalsas, {
    constraints: true,
    foreignKey: 'id_pergunta',
    foreignKeyConstraint: 'id_pergunta'
})

module.exports = Tb006_respostasFalsas