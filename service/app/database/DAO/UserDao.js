const connectionDB = require("../ConnectionDB");

const UserDAO = {
    
    async insertUser(userModel) {
        try{
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`INSERT INTO users(name, email,  adm, password) VALUES (?,?,?,?)`, [ userModel.name, userModel.email, userModel.adm, userModel.password]);
            
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

    async selectUser(userModel) {
        try{
            var connection = await connectionDB.openConnectionDB();

            const result = await connection.promise().execute('SELECT * FROM users WHERE email = ? AND password = ?', [userModel.email, userModel.password]);
            
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

    async updateUser(userModel){
        try{
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`UPDATE users SET name = ?, tell = ?, surname = ?, email = ?, adress = ?, password = ? WHERE id = ?`, [userModel.name, userModel.tell, userModel.surname, userModel.email, userModel.adress, userModel.password, userModel.id]);
            
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

    async deleteUser(userModel){
        try{
            var connection = await connectionDB.openConnectionDB();

            var result = await connection.execute(`DELETE FROM users WHERE id = ?`, [userModel.id]);
            
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
  
  
  
  module.exports = UserDAO;


  