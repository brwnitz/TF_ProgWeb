const Utils = require("../util/Utils");
const CategoryDAO = require("../database/DAO/CategoryDao");
const ProductDAO = require("../database/DAO/PackedLunchDao");
const ImageDAO = require("../database/DAO/ImagePackedLunchDao");
const ProductModel = require("../model/PackedLunchModel");
const ImagesModel =  require("../model/ImagesModel");
const UserModel = require("../model/UserModel");
const fs = require('fs');
const path = require('path');

const ProductController = {
    async insertProduct(req, res) {
        try{
            if(req.body != [] && req.body != undefined ){
                let productModel = new ProductModel(req.body);
                let userToken = new UserModel(req.decoded);
                if(userToken.adm == true){
                    if(Utils.notEmpty(productModel.name) && Utils.notEmpty(productModel.description) && Utils.notEmpty(productModel.ingredients) && Utils.notEmpty(productModel.price) && Utils.notEmpty(productModel.stock) && Utils.notEmpty(productModel.category)){
                        let existCategory = await CategoryDAO.selectCategoryById({id: productModel.category});
                        let existProduct = await ProductDAO.selectProduct(productModel);
                        if(existCategory.result && existProduct.result){
                            if(existCategory.data.length > 0){
                                    if(existProduct.data.length == 0){
                                        let intBD = await ProductDAO.insertProduct(productModel);
                                        if(intBD.result){
                                            res.status(200).json({
                                                'type': "S",                            
                                                'message': 'Sucesso ao cadastrar produto',
                                                'id':intBD.id
                                            });
                                        }else{
                                            res.status(500).json({
                                                'type': "E",                            
                                                'message': 'Erro ao cadastrar produto'
                                            });
                                        }
                                          
                                    }else{
                                        res.status(400).json({
                                            'type': "E",                            
                                            'message': 'produto já cadastrado'
                                        });
                                    }

                            }else{
                                res.status(400).json({
                                    'type': "E",                            
                                    'message': 'categoria selecionada não existe no banco de dados'
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

    async selectAllProducts(req, res){
        let products = await ProductDAO.selectAllProduct();
        if(products.result){
            resultProducts = await ProductController.getImagesProduct(products.data);
            res.status(200).json({
                'type': "S",                            
                'message': 'Sucesso ao selecionar todos os produtos',
                'data': products.data
            });
        }else{
            res.status(500).json({
                'type': "E",                            
                'message': 'Erro interagir com o banco de dados'
            });
        }
    },

    async selectAllProductsByCategory(req, res){
        try{
            if(req.query != [] && req.query != undefined ){
                if(Utils.notEmpty(req.query.category)){
                    let products = await ProductDAO.selectProductByCategory({category: req.query.category});
                    if(products.result){
                        res.status(200).json({
                            'type': "S",                            
                            'message': 'Sucesso ao selecionar os produtos',
                            'data': products.data
                        });
                    }else{
                        res.status(500).json({
                            'type': "E",                            
                            'message': 'Erro interagir com o banco de dados'
                        });
                    }
                }else{
                    res.status(400).json({
                        'type': "E",                            
                        'message': 'Dados necessário para pesquisa não encontrado na requisição'
                    });
                }
            }else{
                res.status(400).json({
                    'type': "E",                            
                    'message': 'Corpo da requisição está vazio'
                });
            }
        }catch(e){
            console.log(e.message);
            res.status(500).json({
                'type': "E",                            
                'message': 'Erro interno do servidor'
            });
        }
    },

    async selectOneProduct(req, res){
        console.log(req.query);
        const {id} = req.query;
        if(!id){
            return res.status(400).json({message: "Id não encontrado na requisição"});
        }
        try{
            const category = await ProductDAO.selectCategoryById({id:id});
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

    async deleteProduct(req, res){
        try{
            let product = new ProductModel(req.query);
            let userToken = new UserModel(req.decoded);
            if(userToken.adm == true){
                if(Utils.notEmpty(product.id)){

                    let allImagesProduct = ImageDAO.selectAllImageProduct(product);
                    if(allImagesProduct.length > 0){
                        for(var i = 0; i < allImagesProduct.length; i++){
                            let image = await ImageDAO.selectImageProductById(allImagesProduct[i]);
                            
                            const filePath = path.join(__dirname, '../public/uploads', image.link);
                            fs.unlink(filePath, (err) => {
                                if (!err) {
                                    ImageDAO.deleteImageProduct(allImagesProduct[i]);   
                                }
                            });
                            
                        }
                    }

                    let intBD = await ProductDAO.deleteProduct(product);
                    if(intBD.result){
                        res.status(200).json({
                            'type': "S",                            
                            'message': 'Sucesso ao deletar produto'
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
                        'message': "Dados necessário para pesquisa não encontrados na requisição" 
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

    async updateProduct(req, res){
        try{
            if(req.body != [] && req.body != undefined ){
                let productModel = new ProductModel(req.body);
                let userToken = new UserModel(req.decoded);
                if(userToken.adm == true){
                    if(Utils.notEmpty(productModel.id) && Utils.notEmpty(productModel.name) && Utils.notEmpty(productModel.description) && Utils.notEmpty(productModel.ingredients) && Utils.notEmpty(productModel.price) && Utils.notEmpty(productModel.stock) && Utils.notEmpty(productModel.category)){
                        let intBD = await ProductDAO.updateProduct(productModel);
                        if(intBD.result){
                            res.status(200).json({
                                'type': "S",                            
                                'message': 'Sucesso ao atualizar produto'
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

    async updateStockProduct(req, res){
        try{
            if(req.body != [] && req.body != undefined ){
                let productModel = new ProductModel(req.body);
                let userToken = new UserModel(req.decoded);
                if(userToken.adm == true){
                    if(Utils.notEmpty(productModel.stock) && Utils.notEmpty(productModel.id)){
                        let intBD = await ProductDAO.updateStockProduct(productModel);
                        if(intBD.result){
                            res.status(200).json({
                                'type': "S",                            
                                'message': 'Sucesso ao atualizar estoque'
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

    async insertImageProduct(req, res) {
        try{
            if(req.body != undefined && req.body != []){
                let productModel = new ProductModel(req.body);
                let userToken = new UserModel(req.decoded);
                console.log(req.file);
                if(req.file != undefined){
                    if(userToken.adm == true){
                        if(Utils.notEmpty(productModel.id)){
                            let imageModel = new ImagesModel({id_packedLunch: productModel.id, link: 'uploads/'+req.file.filename});
                            let intBD = await ImageDAO.insertImageProduct(imageModel);
                            if(intBD.result){
                                res.status(200).json({
                                    'type': "S",                            
                                    'message': 'Sucesso ao cadastrar imagem do produto',
                                });
                            }else{
                                res.status(500).json({
                                    'type': "E",                            
                                    'message': 'Erro ao cadastrar produto'
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
                        'message': "Imagem inválida, verifique o tipo da imagem (jpeg, png, svg ou webp) e o tamanho (max, 20mb)" 
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

    async deleteImageProduct(req, res) {
        try{
            if(req.body != undefined && req.body != []){
                let userToken = new UserModel(req.decoded);
                    if(userToken.adm == true){
                        if(req.body.imagesDelete != null && req.body.imagesDelete != undefined ){
                            let imagesDeleteId = req.body.imagesDelete;
                            if(imagesDeleteId.length > 0){
                                for(var i = 0; i < imagesDeleteId.length; i++){
                                    console.log(imagesDeleteId[i]);
                                    await ImageDAO.deleteImageProduct(imagesDeleteId[i]); 
                                }
                                
                                res.status(200).json({
                                    'type': "S",                            
                                    'message': 'Sucesso ao deletar as imagens do produto',
                                });
                            }else{
                                res.status(400).json({
                                    'type': "E",                            
                                    'message': 'Erro, lista vazia',
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

    async selectReportProductWithoutStock(req, res){
        try{
            if(req.query != [] && req.query != undefined ){
                let userToken = new UserModel(req.decoded);
                if(userToken.adm == true){
                        let report = await ProductDAO.selectOutOfStockProducts();
                        
                        if(report.result){
                            console.log(report.data);
                            resultProducts = await ProductController.getImagesProduct(report.data);
                            res.status(200).json({
                                'type': "S",                            
                                'message': 'Sucesso ao selecionar relatório',
                                'data': resultProducts
                            });
                        }else{
                            res.status(500).json({
                                'type': "E",                            
                                'message': 'Erro interagir com o banco de dados'
                            });
                        }
                }else{
                    res.status(400).json({
                        'type': "E",                            
                        'message': 'Corpo da requisição está vazio'
                    });
                }
            }else{
                res.status(400).json({
                    'type': "E",                            
                    'message': 'Usuário sem permissão para ação'
                });
            }
        }catch(e){
            console.log(e.message);
            res.status(500).json({
                'type': "E",                            
                'message': 'Erro interno do servidor'
            });
        }
    },

    async getImagesProduct(dataProducts){
        if(dataProducts.length > 0){
            for(var i = 0; i < dataProducts.length; i++){
                resultImages = await ImageDAO.selectAllImageProduct({id_packedLunch: dataProducts[i].id});
                if(resultImages.data == undefined || resultImages.data == null){
                    resultImages.data = [];
                }
                dataProducts[i].images = resultImages.data;   
            }
            return dataProducts;
        }else{
            return [];
        }
    }








};
  
module.exports = ProductController;