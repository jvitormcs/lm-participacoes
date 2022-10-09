const Premio = require('../models/tb004_premio')

module.exports = class RewardController {


    static async rewardRegister(req, res){

        const { nome_premio, image, valor_premio } = req.body

        if(!nome_premio){
            res.status(422).json({message: "O nome do premio não pode ficar em branco"})
            return
        }

        if(!valor_premio){
            res.status(422).json({message: "O valor do premio não pode ficar em branco"})
            return
        }

        const reward = {
            nome_premio,
            image,
            valor_premio
        }


        try{
            await Premio.create(reward)
            res.status(200).json({message: "Premio Cadastrado com sucesso"})
        } catch(err){
            res.status(500).json({ message: err })
        }

    }

    static async getReward(req, res){

        const rewardData = await Premio.findAll()

        res.status(200).json(rewardData)

    }

    static async rewardUpdate(req, res){

        const id_premio = req.params.id

        const { nome_premio, image, valor_premio } = req.body

        if(!nome_premio){
            res.status(422).json({message: "O nome do premio não pode ficar em branco"})
            return
        }

        if(!valor_premio){
            res.status(422).json({message: "O valor do premio não pode ficar em branco"})
            return
        }

        const reward = {
            nome_premio,
            image,
            valor_premio
        }


        try{
            await Premio.update(reward, {where: {id_premio: id_premio}})
            res.status(200).json({message: "Premio atualizado com sucesso"})
        } catch(err){
            res.status(422).json({ message: err })
        }

    }

    static async removeReward(req, res){ 

        const id_premio = req.params.id

        try{

            await Premio.destroy({where: {id_premio: id_premio}})
            res.status(200).json({message: "Pergunta deletada com sucesso"})
        } catch(err){
            res.status(422).json({message: err})
        }

    }
}