const connectionDB = require("../ConnectionDB");

const FavDao = {
    
    async insertFav(favModel) {
        try {
            var connection = await connectionDB.openConnectionDB();
            var results = await connection.execute( `INSERT INTO fav (id_user, id_kit, id_packedLunch) VALUES (?, ?, ?)`, [favModel.id_user, favModel.id_kit, favModel.id_packedLunch]);
            await connection.end();
            
            if(results != null) {
                console.log("Sucesso na inserção!");
                return ({result: true, message: "Sucesso na inserção!"});
            } else {
                console.log("Erro na inserção!");
                return ({result: false, message: "Erro na inserção!"});
            }
        } catch(error) {
            console.log(error);
            return ({result: false, message: error});
        }
    },

    async selectAllFavs() {
        try {
            var connection = await connectionDB.openConnectionDB();
            const result = await connection.promise().execute('SELECT * FROM fav');
            await connection.end();
            
            if(result != null) {
                console.log("Sucesso na seleção!");
                return ({result: true, message: "Sucesso na seleção!", data: result[0]});
            } else {
                console.log("Erro na seleção!");
                return ({result: false, message: "Erro na seleção!", data: []});
            }
        } catch(error) {
            console.log(error);
            return ({result: false, message: error, data: []});
        }
    },

    async selectFavByUser(favModel) {
        try {
            var connection = await connectionDB.openConnectionDB();
            const result = await connection.promise().execute('SELECT * FROM fav WHERE id_user = ?', [favModel.id_user]);
            await connection.end();
            
            if(result != null) {
                console.log("Sucesso na seleção!");
                return ({result: true, message: "Sucesso na seleção!", data: result[0]});
            } else {
                console.log("Erro na seleção!");
                return ({result: false, message: "Erro na seleção!", data: []});
            }
        } catch(error) {
            console.log(error);
            return ({result: false, message: error, data: []});
        }
    },

    async updateFav(favModel) {
        try {
            var connection = await connectionDB.openConnectionDB();
            var result = await connection.execute(
                `UPDATE fav SET id_user = ?, id_kit = ?, id_packedLunch = ? WHERE id = ?`, 
                [favModel.id_user, favModel.id_kit, favModel.id_packedLunch, favModel.id]
            );
            await connection.end();
            
            if(result != null) {
                console.log("Sucesso na atualização!");
                return ({result: true, message: "Sucesso na atualização!"});
            } else {
                console.log("Erro na atualização!");
                return ({result: false, message: "Erro na atualização!"});
            }
        } catch(error) {
            return ({result: false, message: error});
        }
    },

    async deleteFav(favModel) {
        try {
            var connection = await connectionDB.openConnectionDB();
            var result = await connection.execute(`DELETE FROM fav WHERE id = ?`, [favModel.id]);
            await connection.end();
            
            if(result != null) {
                console.log("Sucesso na remoção!");
                return ({result: true, message: "Sucesso na remoção!"});
            } else {
                console.log("Erro na remoção!");
                return ({result: false, message: "Erro na remoção!"});
            }
        } catch(error) {
            return ({result: false, message: error});
        }
    },
};

module.exports = FavDao;
