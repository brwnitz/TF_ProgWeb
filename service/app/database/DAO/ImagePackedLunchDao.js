const connectionDB = require("../ConnectionDB");

const ImagePackedLunchDao = {
    
    async insertImageProduct(imageModel) {
        try{
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`INSERT INTO imagesProducts(id_packedLunch, link) VALUES (?,?)`, [ imageModel.id_packedLunch, imageModel.link]);
            
            await connection.end();
            
            if(result != null){
                console.log("Sucesso na inseção!");
                return ({result: true, message: "Sucesso na inseção!"});
            }else{
                console.log("Erro na inseção!");
                return ({result: false, message: "Erro na inseção!"});
            }
        }catch(error){
            console.log(error);
            return ({result: false, message: error});
        }
    },


    async selectAllImageProduct(imageModel) {
        try{
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute('SELECT * FROM imagesProducts WHERE id_packedLunch = ?', [imageModel.id_packedLunch]);
            
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

    async selectImageProductById(imageModel) {
        try{
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute('SELECT * FROM imagesProducts WHERE id = ?', [imageModel.id]);
            
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

    async deleteImageProduct(imageModel){
        try{
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`DELETE FROM imagesProducts WHERE id = ?`, [imageModel.id]);
            
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
        
    },

    async deleteAllImageProduct(imageModel){
        try{
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`DELETE FROM imagesProducts WHERE id_packedLunch = ?`, [imageModel.id]);
            
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
  
  
  
  module.exports = ImagePackedLunchDao;


  