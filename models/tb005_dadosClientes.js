const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Tb004_premio = require('./tb004_premio')

const Tb005_dadosClientes = db.define('tb005_dadosClientes',{

    id_clientes:{
        type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
    nome_cliente: {
        type: DataTypes.STRING(220),
        allowNull: false,
        require: true,
    },
    email_cliente: {
        type: DataTypes.STRING(50),
        allowNull: false,
        require: true,
    },
    cpf_cliente: {
        type: DataTypes.STRING(50),
        allowNull: false,
        require: true,
    },
    id_premio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        require: true,
    },
    datacreate_cliente:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    tempoBlock: {
        type:DataTypes.DATE,
        allowNull: true,
    }

}, {timestamps: false, freezeTableName: true})



Tb005_dadosClientes.belongsTo(Tb004_premio, {
    constraints: true,
    foreignKey: 'id_premio',
    foreignKeyConstraint: 'id_premio'
})

Tb004_premio.hasMany(Tb005_dadosClientes, {
    constraints: true,
    foreignKey: 'id_premio',
    foreignKeyConstraint: 'id_premio'
})

module.exports = Tb005_dadosClientes