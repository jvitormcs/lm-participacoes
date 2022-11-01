const { DataTypes } = require('sequelize')

const db = require('../db/conn')


const Tb003_CPF = db.define('tb003_cpf',{

    id_cpf:{
        type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
    cpf_cliente: {
        type: DataTypes.STRING(50),
        allowNull: false,
        require: true,
    },
    datacreate_cpf:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },

}, {timestamps: false, freezeTableName: true})


module.exports = Tb003_CPF