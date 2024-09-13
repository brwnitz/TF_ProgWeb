const Utils = require("../util/Utils");
const CategoryDAO = require("../database/DAO/CategoryDao");
const CategoryModel = require("../model/CategoryModel");
const UserModel = require("../model/UserModel");

const CategoryController = {
    async insertCategoryControll(req, res) {
        try{
            if(req.body != [] && req.body != undefined ){
                let category = new CategoryModel(req.body);
                let userToken = new UserModel(req.decoded);
                console.log(userToken.adm);
                if(userToken.adm == true){
                    if(Utils.notEmpty(category.name) && Utils.notEmpty(category.description) && Utils.notEmpty(category.icon)){
                        let existCategory = await CategoryDAO.selectCategory(category);
                        if(existCategory.result){
                            if(existCategory.data.length == 0){
                                let intBD = await CategoryDAO.insertCategory(category);
                                if(intBD.result){
                                    res.status(200).json({
                                        'type': "S",                            
                                        'message': 'Sucesso ao cadastrar categoria'
                                    });
                                }else{
                                    res.status(500).json({
                                        'type': "E",                            
                                        'message': 'Erro ao cadastrar categoria'
                                    });
                                }
                                  
                            }else{
                                res.status(400).json({
                                    'type': "E",                            
                                    'message': 'categoria já cadastrada'
                                });
                            }
                        }else{
                            res.status(500).json({
                                'type': "E",                            
                                'message': 'Erro interagir com o banco de dados'
                            });
                        }
                             
                    }else{
                        res.status(400).json({ 
                            'type': "E",
                            'message': "Campos obrigatórios estão vazios" 
                        });  
                    }
                }else{
                    res.status(405).json({ 
                        'type': "E",
                        'message': "Usuário sem permissão para realizar ação" 
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

    async selectAllCategory(req, res){
        let categories = await CategoryDAO.selectAllCategory();
        if(categories.result){
            res.status(200).json({
                'type': "S",                            
                'message': 'Sucesso ao selecionar categorias',
                'data': categories.data
            });
        }else{
            res.status(500).json({
                'type': "E",                            
                'message': 'Erro interagir com o banco de dados'
            });
        }
    },

    async selectOneCategory(req, res){
        const {id} = req.query;
        if(!id){
            return res.status(400).json({message: "Id não encontrado na requisição"});
        }
        try{
            const category = await CategoryDAO.selectCategoryById({id:id});
            if(category.result){
                res.status(200).json({
                'type': "S",                            
                'message': 'Sucesso ao selecionar categorias',
                'data': category.data
            });
        }else{
            res.status(500).json({
                'type': "E",                            
                'message': 'Erro interagir com o banco de dados'
            });
        }
    } catch(e){
        res.status(500).json({message: "Erro interno do servidor"});
    }
    },
    


    async deleteCategory(req, res){
        try{
            let category = new CategoryModel(req.query);
            let userToken = new UserModel(req.decoded);
            if(userToken.adm == true){
                if(Utils.notEmpty(category.id)){
                    let intBD = await CategoryDAO.deleteCategory(category);
                    if(intBD.result){
                        res.status(200).json({
                            'type': "S",                            
                            'message': 'Sucesso ao deletar categoria'
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
                        'message': "Id não encontrado na requisição" 
                    });  
                }
            }else{
                res.status(405).json({ 
                    'type': "E",
                    'message': "Usuário sem permissão para realizar ação" 
                });
            }
        }catch(e){
            res.status(500).json({ 
                'type': "E",
                'message': "Erro interno do servidor" 
            });
        }
    },

    async updateCategory(req, res){
        try{
            if(req.body != [] && req.body != undefined ){
                let category = new CategoryModel(req.body);
                let userToken = new UserModel(req.decoded);
                if(userToken.adm == true){
                    if(Utils.notEmpty(category.id) && Utils.notEmpty(category.name) && Utils.notEmpty(category.description) && Utils.notEmpty(category.icon)){
                        let intBD = await CategoryDAO.updateCategory(category);
                        if(intBD.result){
                            res.status(200).json({
                                'type': "S",                            
                                'message': 'Sucesso ao atualizar categoria'
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
                    res.status(405).json({ 
                        'type': "E",
                        'message': "Usuário sem permissão para realizar ação" 
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
  
module.exports = CategoryController;