const Clientes = require('../models/tb005_dadosClientes')
const Cpf = require('../models/tb003_cpf');
const { Op } = require('sequelize');

module.exports = class ClientController {
    
    static async registerClient(req, res){

        const { nome_cliente, email_cliente, cpf_cliente, id_premio } = req.body

        if(!nome_cliente){
            res.status(422).json({message: 'O nome é obrigatório'});
            return
        };

        if(!email_cliente){
            res.status(422).json({message: 'O e-mail é obrigatório'});
            return
        };
        
        if(!cpf_cliente){
            res.status(422).json({message: 'O CPF é obrigatório'});
            return
        };
        if(!id_premio){
            res.status(422).json({message: 'O id do premio é obrigatório'});
            return
        };

        const client = {

            nome_cliente,
            email_cliente,
            cpf_cliente,
            id_premio

        }

        try{
            await Clientes.create(client)
            res.status(200).json({message: "Registrado com sucesso"})
        } catch (err) {
            res.status(500).json({ message: err })
        }
    }

    static async getClient(req, res){

        const clientData = await Clientes.findAll()
        res.status(200).json({clientes : clientData})

    }

    static async postCpf(req, res){
        const { cpf } = req.body

        const cpfs = {
            cpf_cliente: cpf
        }

        try{
            Cpf.create(cpfs)
            res.status(200).json({message : 'sucesso'})
        } catch (err){
            res.status(401).json({message : `Erro::${err}`})
        }
    }

    static async getCPF(req, res){

        const cpfs = await Cpf.findAll({
            
            where: {
                id_cpf: {
                    [Op.gt]: 0
                }
            }
        })

        res.status(200).json({dados: cpfs})

    }

}