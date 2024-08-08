const Utils = require("../util/Utils");
const UserDAO = require("../database/DAO/UserDao");
const jwt = require('jsonwebtoken');
const UserModel = require("../model/UserModel");
require('dotenv').config();

const PRIVATE_KEY_JWT = process.env.PRIVATE_KEY_JWT;

const UserController = {
    async insertUserControll(req, res) {
        try{
            if(req.body != [] && req.body != undefined ){
                let user = new UserModel(req.body);
                if(Utils.notEmpty(user.name) && Utils.notEmpty(user.email) && user.adm != undefined && Utils.notEmpty(user.password)){
                    let existUser = await UserDAO.selectUser(user);
                    if(existUser.result){
                        if(existUser.data.length == 0){
                            let intBD = await UserDAO.insertUser(user);
                            if(intBD.result){
                                res.status(200).json({
                                    'type': "S",                            
                                    'message': 'Sucesso ao cadastrar usuário'
                                });
                            }else{
                                res.status(500).json({
                                    'type': "E",                            
                                    'message': 'Erro ao cadastrar usuário'
                                });
                            }
                              
                        }else{
                            res.status(400).json({
                                'type': "E",                            
                                'message': 'usuário já cadastrado'
                            });
                        }
                    }else{
                        res.status(500).json({
                            'type': "E",                            
                            'message': 'Erro interagir com o banco'
                        });
                    }
                         
                }else{
                    res.status(400).json({ 
                        'type': "E",
                        'message': "Campos obrigatórios estão vazios" 
                    });  
                }

            }else{
                res.status(400).json({ 
                    'type': "E",
                    'message': "Campos obrigatórios estão vazios" 
                });
            }
        }catch(e){
            console.log(e.message);
            res.status(500).json({ 
                'type': "E",
                'message': "Erro interno do servidor" 
            });
        }    

    },
    
    async login (req, res){
        try{
            if(req.body != [] && req.body != undefined ){
                let user = new UserModel(req.body);
                if(Utils.notEmpty(user.password) && Utils.notEmpty(user.email)){
                    let userDB = await UserDAO.selectUser(user);
                    if(userDB.result){
                        userDB.data[0].password = "";
                        userDB.data[0].adm = userDB.data[0].adm == 1 ? true : false;

                        var userToken = {
                            id: userDB.data[0].id,
                            name: userDB.data[0].name,
                            email:userDB.data[0].email,
                            adm: userDB.data[0].adm
                        }
                        console.log(PRIVATE_KEY_JWT);
                        userDB.data[0].id = "";
                        console.log(userDB.data);
                        var token = jwt.sign(userToken, PRIVATE_KEY_JWT, {
                            expiresIn: '30m'
                        });

                        console.log(token);



                        res.status(200).json({
                            'type': "S", 
                            'token': token,
                            'data': userDB.data,                           
                            'message': 'Sucesso ao efetuar login'
                        });
                    }else{
                        res.status(400).json({
                            'data': [],
                            'type': "E",
                            'token': "",                            
                            'message': 'Usuário não encontrado, verifique se sua senha e email estão corretos.'
                        });
                    }
                }else{
                    res.status(400).json({ 
                        'type': "E",
                        'message': "Campos obrigatórios estão vazios" 
                    });
                }
            }else{
                res.status(400).json({ 
                    'type': "E",
                    'message': "Campos obrigatórios estão vazios" 
                });
            }
            
        }catch(error){
            res.status(500).json({ 
                'type': "E",
                'message': "Erro interno do servidor" 
            });
        }
        
    },

    async deleteUser(req, res){
        try{
            let user = new UserModel(req.decoded);
            if(Utils.notEmpty(user.id)){
                let intBD = await UserDAO.deleteUser(user);
                if(intBD.result){
                    res.status(200).json({
                        'type': "S",                            
                        'message': 'Sucesso ao deletar cliente'
                    });
                }else{
                    res.status(500).json({
                        'type': "E",                            
                        'message': intBD.message
                    });
                }       
            }else{
                res.status(400).json({ 
                    'type': "E",
                    'message': "Id do usuário não encontrado na requisição" 
                });  
            }
        }catch(e){
            res.status(500).json({ 
                'type': "E",
                'message': "Erro interno do servidor" 
            });
        }
    },

    async updateUser(req, res){
        try{
            if(req.body != [] && req.body != undefined ){
                let user = new UserModel(req.body);
                let userToken = new UserModel(req.decoded);
                console.log(user);
                console.log(req.decoded);
                user.id = userToken.id;
                if(Utils.notEmpty(user.id) && Utils.notEmpty(user.name) && Utils.notEmpty(user.email) && Utils.notEmpty(user.password)){
                            let intBD = await UserDAO.updateUser(user);
                            if(intBD.result){
                                res.status(200).json({
                                    'type': "S",                            
                                    'message': 'Sucesso ao atualizar usuário'
                                });
                            }else{
                                res.status(500).json({
                                    'type': "E",                            
                                    'message': intBD.message
                                });
                            }  
                }else{
                    res.status(400).json({ 
                        'type': "E",
                        'message': "Campos obrigatórios estão vazios" 
                    });  
                }
            }else{
                res.status(400).json({ 
                    'type': "E",
                    'message': "Campos obrigatórios estão vazios" 
                });
            }
        }catch(e){
            res.status(500).json({ 
                'type': "E",
                'message': "Erro interno do servidor" 
            });
        }
    },







};
  
module.exports = UserController;