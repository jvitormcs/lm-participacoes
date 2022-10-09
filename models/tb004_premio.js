const { DataTypes } = require('sequelize')

const db = require('../db/conn')


const Tb004_premio = db.define('tb004_premio',{

    id_premio:{
        type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
    nome_premio: {
        type: DataTypes.STRING(220),
        allowNull: false,
        require: true,
    },
    image: {
        type: DataTypes.STRING(220),
        allowNull: true,
        require: false,
    },
    valor_premio: {
        type: DataTypes.STRING(220),
        allowNull: false,
        require: true,
    },
    datacreate_premio: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }

}, {timestamps: false, freezeTableName: true})


module.exports = Tb004_premio