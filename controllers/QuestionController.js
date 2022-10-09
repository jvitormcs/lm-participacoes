const Perguntas = require('../models/tb002_perguntas')

module.exports = class QuestionController {


    static async questionCreate(req,res){

        const { pergunta, descricao, resposta, resposta_falsaP, resposta_falsaS, resposta_falsaT, resposta_falsaQ } = req.body

       
        let image = ''

        if(req.file){
            image = req.file.filename
        }


        if(!pergunta){
            res.status(422).json({message: 'A pergunta não pode ficar em branco'})
            return
        }
        if(!descricao){
            res.status(422).json({message: 'A descrição não pode ficar em branco'})
            return
        }
        if(!resposta){
            res.status(422).json({message: 'A reposta não pode ficar em branco'})
            return
        }
        if(!resposta_falsaP){
            res.status(422).json({message: 'A Resposta falsa não pode ficar em branco'})
            return
        }
        if(!resposta_falsaS){
            res.status(422).json({message: 'A Resposta falsa não pode ficar em branco'})
            return
        }
        if(!resposta_falsaT){
            res.status(422).json({message: 'A Resposta falsa não pode ficar em branco'})
            return
        }
        if(!resposta_falsaQ){
            res.status(422).json({message: 'A Resposta falsa não pode ficar em branco'})
            return
        }

        const question = {
            pergunta,
            descricao,
            resposta,
            image,
            resposta_falsaP,
            resposta_falsaS,
            resposta_falsaT,
            resposta_falsaQ
        }

        try{
            await Perguntas.create(question)
            res.status(200).json({message: "Pergunta criada com sucesso"})
        } catch (err) {
            res.status(500).json({ message: err })
        }

    }

    static async updateQuestion(req, res){

        const id_perguntas = req.params.id
        const { pergunta, descricao, resposta, resposta_falsaP, resposta_falsaS, resposta_falsaT, resposta_falsaQ } = req.body
       
        const question = {
            pergunta,
            descricao,
            resposta,
            resposta_falsaP,
            resposta_falsaS,
            resposta_falsaT,
            resposta_falsaQ
        }

        if(!question.pergunta){
            res.send(422).json({message: "A pergunta não pode ficar em branco"})
            return
        }

        try{
            await Perguntas.update(question, { where: {id_perguntas: id_perguntas }})
            res.status(200).json({message: "Pergunta atualizada com sucesso"})

        } catch(err){
            res.status(422).json({message: err})
        }

    }

    static async removeQuestion(req, res){ 

        const id_perguntas = req.params.id

        try{

            await Perguntas.destroy({where: {id_perguntas: id_perguntas}})
            res.status(200).json({message: "Pergunta deletada com sucesso"})
        } catch(err){
            res.status(422).json({message: err})
        }

    }

    static async getQuestions(req, res){

        const perguntas = await Perguntas.findAll()
        res.status(200).json( { perguntas })
    }

}