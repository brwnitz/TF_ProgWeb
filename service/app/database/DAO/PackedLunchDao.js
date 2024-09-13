//DAO do produto Marmita

const connectionDB = require("../ConnectionDB");

const ProductDao = {
    
    async insertProduct(productModel) {
        try{
            var connection = await connectionDB.openConnectionDB();
            var results = await connection.execute(`INSERT INTO packedLunch(name, description, ingredients, price, moreInfors, stock, category) VALUES (?,?,?,?,?,?,?)`, [ productModel.name, productModel.description, productModel.ingredients, productModel.price, productModel.moreInfors, productModel.stock, productModel.category]);
            
            await connection.end();
            
            if(results != null){
                console.log("Sucesso na inseção!");
                let lastProduct = await ProductDao.selectLastProduct();
                console.log(lastProduct)
                
                return ({result: true, message: "Sucesso na inseção!", id: lastProduct.data[0].id});
            }else{
                console.log("Erro na inseção!");
                return ({result: false, message: "Erro na inseção!"});
            }
        }catch(error){
            console.log(error);
            return ({result: false, message: error});
        }
    },

    

    

    async selectAllProduct() {
        try{
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute('SELECT * FROM packedLunch');
            
            await connection.end();
            
            if(result != null){
                console.log("Sucesso na seleção!");
                return ({result: true, message: "Sucesso na seleção!", data: result[0]});
            }else{
                console.log("Erro na seleção!");
                return ({result: false, message: "Erro na seleção!", data: []});
            }
        }catch(error){
            console.log(error);
            return ({result: false, message: error, data: []});
        }
    },



    async selectProduct(productModel) {
        try{
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute('SELECT * FROM packedLunch WHERE name = ?', [productModel.name]);
            
            await connection.end();
            
            if(result != null){
                console.log("Sucesso na seleção!");
                return ({result: true, message: "Sucesso na seleção!", data: result[0]});
            }else{
                console.log("Erro na seleção!");
                return ({result: false, message: "Erro na seleção!", data: []});
            }
        }catch(error){
            console.log(error);
            return ({result: false, message: error, data: []});
        }
    },

    async selectLastProduct() {
        try{
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute('SELECT * FROM packedLunch ORDER BY id DESC LIMIT 1');
            
            await connection.end();
            
            if(result != null){
                console.log("Sucesso na seleção!");
                console.log(result[0]);
                return ({result: true, message: "Sucesso na seleção!", data: result[0]});
            }else{
                console.log("Erro na seleção!");
                return ({result: false, message: "Erro na seleção!", data: []});
            }
        }catch(error){
            console.log(error);
            return ({result: false, message: error, data: []});
        }
    },



    async selectProductByCategory(productModel) {
        try{
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute('SELECT * FROM packedLunch WHERE category = ?', [productModel.category]);
            
            await connection.end();
            
            if(result != null){
                console.log("Sucesso na seleção!");
                return ({result: true, message: "Sucesso na seleção!", data: result[0]});
            }else{
                console.log("Erro na seleção!");
                return ({result: false, message: "Erro na seleção!", data: []});
            }
        }catch(error){
            console.log(error);
            return ({result: false, message: error, data: []});
        }
    },



    async updateProduct(productModel){
        try{
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`UPDATE packedLunch SET name = ?, description = ?, ingredients = ?, price = ?, moreInfors = ?, stock = ?, category = ? WHERE id = ?`, [productModel.name, productModel.description, productModel.ingredients, productModel.price, productModel.moreInfors, productModel.stock, productModel.category, productModel.id]);
            
            await connection.end();
            
            if(result != null){
                console.log("Sucesso na atualização!");
                return ({result: true, message: "Sucesso na atualização!"});
            }else{
                console.log("Erro na atualização!");
                return ({result: false, message: "Erro na atualização!"});
            }
        }catch(error){
            return ({result: false, message: error});
        }
        
    },


    async updateStockProduct(productModel){
        try{
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`UPDATE packedLunch SET stock = ? WHERE id = ?`, [productModel.stock, productModel.id]);
            
            await connection.end();
            
            if(result != null){
                console.log("Sucesso na atualização!");
                return ({result: true, message: "Sucesso na atualização!"});
            }else{
                console.log("Erro na atualização!");
                return ({result: false, message: "Erro na atualização!"});
            }
        }catch(error){
            return ({result: false, message: error});
        }
        
    },

    async selectCategoryById(productModel) {
        try{
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute('SELECT * FROM packedLunch WHERE id = ?', [productModel.id]);
            
            await connection.end();
            
            if(result != null){
                console.log("Sucesso na seleção!");
                return ({result: true, message: "Sucesso na seleção!", data: result[0]});
            }else{
                console.log("Erro na seleção!");
                return ({result: false, message: "Erro na seleção!", data: []});
            }
        }catch(error){
            console.log(error);
            return ({result: false, message: error, data: []});
        }
    },

    

    async deleteProduct(productModel){
        try{
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`DELETE FROM packedLunch WHERE id = ?`, [productModel.id]);
            
            await connection.end();
            
            if(result != null){
                console.log("Sucesso na remoção!");
                return ({result: true, message: "Sucesso na remoção!"});
            }else{
                console.log("Erro na remoção!");
                return ({result: false, message: "Erro na remoção!"});
            }
        }catch(error){
            return ({result: false, message: error});
        }
        
    }


  
    
  };
  
  
  
  module.exports = ProductDao;


  