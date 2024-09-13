const connectionDB = require("../ConnectionDB");

const CategoryDao = {
    
    async insertCategory(categoryModel) {
        try{
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`INSERT INTO category(name, description, icon) VALUES (?,?,?)`, [ categoryModel.name, categoryModel.description, categoryModel.icon]);
            
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

    

    async selectAllCategory() {
        try{
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute('SELECT * FROM category');
            
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

    async selectCategory(categoryModel) {
        try{
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute('SELECT * FROM category WHERE name = ?', [categoryModel.name]);
            
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

    async selectCategoryById(categoryModel) {
        try{
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute('SELECT * FROM category WHERE id = ?', [categoryModel.id]);
            
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

    async selectCategoryByRealId(id) {
        try{
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute('SELECT * FROM category WHERE id = ?', [id]);
            
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

    async updateCategory(categoryModel){
        try{
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`UPDATE category SET name = ?, description = ?, icon = ? WHERE id = ?`, [categoryModel.name, categoryModel.description, categoryModel.icon, categoryModel.id]);
            
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

    async deleteCategory(categoryModel){
        try{
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`DELETE FROM category WHERE id = ?`, [categoryModel.id]);
            
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
  
  
  
  module.exports = CategoryDao;


  