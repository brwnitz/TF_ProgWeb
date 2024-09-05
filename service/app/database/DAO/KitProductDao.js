const connectionDB = require("../ConnectionDB");

const KitDao = {
    
    async insertKit(kitItemsModel) {
        try{
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`INSERT INTO kitItems (id_kit, id_packedLunch, qtdPackedLunch) VALUES (?,?,?)`, [ kitItemsModel.id_kit, kitItemsModel.id_packedLunch, kitItemsModel.qtdPackedLunch]);
            
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

    async selectKit(kitItemsModel) {
        try{
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute('SELECT * FROM kitItems WHERE id_kit = ?', [kitItemsModel.id_kit]);
            
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

    async selectKitProduct(kitItemsModel) {
        try{
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute('SELECT * FROM kitItems WHERE id_kit = ?', [kitItemsModel.id]);
            
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

    async selectItem(kitItemsModel) {
        try{
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute('SELECT * FROM kitItems WHERE id_packedLunch = ?', [kitItemsModel.id_packedLunch]);
            
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

    async updateKitItems(kitItemsModel){
        try{
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`UPDATE kitItems SET id_kit = ?, id_packedLunch = ?, qtdPackedLunch = ? WHERE id = ?`, [kitItemsModel.id_kit, kitItemsModel.id_packedLunch, kitItemsModel.qtdPackedLunch, kitItemsModel.id]);
            
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


    async deleteKitItems(kitItemsModel){
        try{
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`DELETE FROM kitItems WHERE id = ?`, [kitItemsModel.id]);
            
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

    async deleteKitAllItems(kitItemsModel){
        try{
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`DELETE FROM kitItems WHERE id_kit= ?`, [kitItemsModel.id_kit]);
            
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
  
  
  
  module.exports = KitDao;


  