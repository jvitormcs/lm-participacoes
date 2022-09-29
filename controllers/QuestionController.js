const Perguntas = require('../models/tb002_perguntas')
const Respostas = require('../models/tb003_respostas')
const RespostasFalsas = require('../models/tb006_respostasFalsas')

module.exports = class QuestionController {

    static async questionCreate(req,res){

        const { pergunta } = req.body
        
        if(!pergunta){
            res.status(422).json({message: 'A pergunta não pode ficar em branco'})
            return
        }

        const question = {
            pergunta,
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

        const question = {
            pergunta: req.body.pergunta
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

    static async answerCreate(req, res) {

        const { id_pergunta, resposta } = req.body

        const verifyQuestion = await Perguntas.findOne({id_perguntas: id_pergunta})

        if(!verifyQuestion){
            
            res.status(422).json({message: 'Pergunta não existe'})
            return

        }
       
        if(!resposta){
            res.status(422).json({message: 'A resposta não pode ficar em branco'})
            return
        }

        const answer = {
            id_pergunta,
            resposta
        }

        try{
            await Respostas.create(answer)
            res.status(200).json({message: "Resposta registrada com sucesso"})
        } catch (err) {
            res.status(500).json({ message: err })
        }

    }

    static async wrongAnswerCreate(req, res) {

        const { id_pergunta, resposta_falsa } = req.body

        const verifyQuestion = await Perguntas.findOne({id_perguntas: id_pergunta})

        if(!verifyQuestion){
            
            res.status(422).json({message: 'Pergunta não existe'})
            return

        }
       
        if(!resposta_falsa){
            res.status(422).json({message: 'A resposta não pode ficar em branco'})
            return
        }

        const wrongAnswer = {
            id_pergunta,
            resposta_falsa
        }

        try{
            await RespostasFalsas.create(wrongAnswer)
            res.status(200).json({message: "Resposta registrada com sucesso"})
        } catch (err) {
            res.status(500).json({ message: err })
        }

    }

    static async getQuestions(req, res){

        const questionData = await Perguntas.findAll()
        res.status(200).json(questionData)
    }

    static async getAnswer(req, res){

        const id_pergunta = req.params.id

        if(!id_pergunta){
            res.status(422).json({message: "passar o id é obrigatório para poder filtrar"})
            return
        } 

        const answerData = await Respostas.findAll(
            {
                where: {id_pergunta: id_pergunta}
            }
        )
        const wrongAnswerData = await RespostasFalsas.findAll(
            {
                where: {id_pergunta: id_pergunta}
            }
        )

        const completeAnswers = {answerData, wrongAnswerData}

        res.status(200).json(completeAnswers)
    }


}