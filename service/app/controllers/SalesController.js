const Utils = require("../util/Utils");
const SalesDAO = require("../database/DAO/SalesDao");
const SaleModel =  require("../model/SaleModel");
const UserModel = require("../model/UserModel");
const ProductDao = require("../database/DAO/PackedLunchDao");
const SalesItemsDao = require("../database/DAO/SalesItemsDao");
const SaleItemsModel = require("../model/SaleItemsModel");

const SalesController = {
    async insertSale(req, res) {
        try{
            if(req.body != [] && req.body != undefined ){
                let saleModel = new SaleModel(req.body);
                    if(Utils.notEmpty(saleModel.date_time) && Utils.notEmpty(saleModel.codeSale) && Utils.notEmpty(saleModel.id_user) && saleModel.saleItems.length > 0){
                        let existSale = await SalesDAO.selectAllSalesFromUsersCodeSale(saleModel);
                        if(existSale.result){
                            if(existSale.data.length == 0){
                                        let intBD = await SalesDAO.insertSale(saleModel);
                                        if(intBD.result){
                                            var countInsertItems = 0;
                                            for(var i = 0; i < saleModel.saleItems.length; i++){
                                                let product = await ProductDao.selectProductById({id: saleModel.saleItems[i].id_packedLunch});
                                                if(product.result && product.data.length > 0){
                                                    var newStock = product.data[0].stock - saleModel.saleItems[i].qtd;
                                                    let updateStockProduct = await ProductDao.updateStockProduct({stock:newStock , id: saleModel.saleItems[i].id_packedLunch});
                                                    if(updateStockProduct.result){
                                                        var saleItemModel = new SaleItemsModel(saleModel.saleItems[i]);
                                                        saleItemModel.id_sale = intBD.id;
                                                        let insertItemDB = await SalesItemsDao.insertSalesItem(saleItemModel);
                                                        if(insertItemDB.result){
                                                            countInsertItems++;
                                                        }
                                                    }
                                                }
                                            }

                                            if(countInsertItems == saleModel.saleItems.length){
                                                res.status(200).json({
                                                    'type': "S",                            
                                                    'message': 'Sucesso ao cadastrar venda'
                                                });
                                            }else if(countInsertItems > 0){
                                                res.status(200).json({
                                                    'type': "E",                            
                                                    'message': 'Erro ao cadastrar venda nem todos os itens foram cadastrados, entre em contato com o administrativo para deletar a venda e estornar o pagamento.'
                                                });
                                            }else{
                                                res.status(200).json({
                                                    'type': "E",                            
                                                    'message': 'Erro ao cadastrar venda nenhum item cadastrado'
                                                });
                                            }
                                        }else{
                                            res.status(500).json({
                                                'type': "E",                            
                                                'message': 'Erro ao cadastrar venda'
                                            });
                                        }

                            }else{
                                res.status(400).json({
                                    'type': "E",                            
                                    'message': 'Venda já cadastrada'
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

    async selectAllSales(req, res){
        let sales = await SalesDAO.selectAllSales();
        if(sales.result){
            resultsales = await SalesController.getSaleItems(sales.data);
            res.status(200).json({
                'type': "S",                            
                'message': 'Sucesso ao selecionar todas as vendas',
                'data': resultSales
            });
        }else{
            res.status(500).json({
                'type': "E",                            
                'message': 'Erro interagir com o banco de dados'
            });
        }
    },

    

    async selectAllSalesUser(req, res){
        try{
            if(req.query != [] && req.query != undefined ){
                if(Utils.notEmpty(req.query.id_user)){
                    let sales = await SalesDAO.selectAllSalesFromUsers({id_user: req.query.id_user});
                    if(sales.result){
                        resultsales = await SalesController.getSaleItems(sales.data);
                        res.status(200).json({
                            'type': "S",                            
                            'message': 'Sucesso ao selecionar as vendas',
                            'data': resultSales
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



    async selectReportSalesValueTotal(req, res){
        try{
            if(req.query != [] && req.query != undefined ){
                let userToken = new UserModel(req.decoded);
                if(userToken.adm == true){
                    if(Utils.notEmpty(req.query.init_date) && Utils.notEmpty(req.query.final_date)){
                        let report = await SalesDAO.selectTotalValuePerDay(req.query.init_date, req.query.final_date);
                        if(report.result){
                            res.status(200).json({
                                'type': "S",                            
                                'message': 'Sucesso ao selecionar relatório',
                                'data': report.data
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

    async selectReportTotalPurchasesPerClient(req, res){
        try{
            if(req.query != [] && req.query != undefined ){
                let userToken = new UserModel(req.decoded);
                if(userToken.adm == true){
                    if(Utils.notEmpty(req.query.init_date) && Utils.notEmpty(req.query.final_date)){
                        let report = await SalesDAO.selectTotalPurchasesPerClient(req.query.init_date, req.query.final_date);
                        if(report.result){
                            res.status(200).json({
                                'type': "S",                            
                                'message': 'Sucesso ao selecionar relatório',
                                'data': report.data
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

    

    async deleteSale(req, res){
        try{
            if(req.query != null && req.query != undefined){
                let userToken = new UserModel(req.decoded);
                if(userToken.adm == true){

                    if(Utils.notEmpty(req.query.id)){

                        let itemsSale = await SalesItemsDao.selectAllSalesItems({id_sale: req.query.id});
                        if(itemsSale.data.length > 0 && itemsSale.result){
                            for(var i = 0; i < itemsSale.data.length; i++){
                                let product = await ProductDao.selectProductById({id: itemsSale.data[i].id_packedLunch});
                                    if(product.result && product.data.length > 0){
                                        var newStock = product.data[0].stock + itemsSale.data[i].qtd;
                                        await ProductDao.updateStockProduct({stock:newStock , id: itemsSale.data[i].id_packedLunch});
                                    }    
                            }
                        }

                        let intBDItems = await SalesItemsDao.deleteSalesItem({id_sale: req.query.id});
                        let intBD = await SalesDAO.deleteSale({id:req.query.id});
                        if(intBD.result && intBDItems.result){
                            res.status(200).json({
                                'type': "S",                            
                                'message': 'Sucesso ao deletar venda'
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
            }else{
                res.status(400).json({ 
                    'type': "E",
                    'message': "Dados necessário para pesquisa não encontrados na requisição" 
                });  
            }
            
        }catch(e){
            res.status(500).json({ 
                'type': "E",
                'message': "Erro interno do servidor" 
            });
        }
    },

    

    async getSaleItems(dataSales){
        if(dataSales.length > 0){
            for(var i = 0; i < dataSales.length; i++){
                resultSalesItems = await SalesItemsDao.selectAllSalesItems({id_sale: dataSales[i].id });
                if(resultSalesItems.data == undefined || resultSalesItems.data == null){
                    resultSalesItems.data = [];
                }
                dataSales[i].saleItems= resultSalesItems.data;   
            }
            return dataSales;
        }else{
            return [];
        }
    }








};
  
module.exports = SalesController;