const User = require('../models/tb001_user')
const bcrypt = require('bcrypt')

module.exports = class UserController {

    static async create(req, res){

        const { nome_user, sobrenome_user, email_user, senha_user } = req.body;

        if(!nome_user){
            res.status(422).json({message: 'O nome é obrigatório'});
            return
        };

        if(!sobrenome_user){
            res.status(422).json({message: 'O sobrenome é obrigatório'});
            return
        };

        if(!email_user){
            res.status(422).json({message: 'O e-mail é obrigatório'});
            return
        };

        if(!senha_user){
            res.status(422).json({message: 'A senha é obrigatória'});
            return
        };

        if(email_user == undefined){

            res.status(400).json({message: 'O e-mail é invalido'});
            return
        };
        
        const userExists = await User.findOne({where: { email_user: email_user }});

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(senha, salt)
        
        const user = {
            nome_user,
            sobrenome_user,
            email_user,
            senha_user: passwordHash
        };


        if (userExists) {
        res.status(422).json({ message: 'Por favor, utilize outro e-mail!' });
        return
        };

        try{
            await User.create(user);
            res.status(200).json({message: 'Usuário Criado'})
        } catch (err) {
            res.status(500).json({ message: err })
        };
    }

    static async login(req, res){
        
        const { email_user, senha_user } = req.body;


        if(!email_user){
            res.status(422).json({message: 'O e-mail é obrigatório'});
        }
        
        if(!senha_user){
            res.status(422).json({message: 'A senha é obrigatória'});
            return
        }

        const user = await User.findOne({where: {email_user: email_user}});

        const password = await User.findOne({where: {senha_user: senha_user}});

        if(!user){
            res.status(422).json({message: 'Não há usuário cadastrado com este e-mail!'})
            return
        };

        const passwordMatch = bcrypt.compareSync(senha, password)

        if(!passwordMatch){
            res.status(422).json({message: 'Senha incorreta'})
        }

        res.status(200).json({message: 'Logado com sucesso'})

    }


}