const connectionDB = require("../ConnectionDB");

const SalesItemsDao = {
    
    async insertSalesItem(salesItemModel) {
        try {
            var connection = await connectionDB.openConnectionDB();
            var results = await connection.execute( 
                `INSERT INTO salesItems (id_sale, id_packedLunch, observations, qtd) VALUES (?, ?, ?, ?)`, 
                [salesItemModel.id_sale, salesItemModel.id_packedLunch, salesItemModel.observations, salesItemModel.qtd]
            );
            await connection.end();
            
            if(results != null) {
                console.log("Sucesso na inserção!");
                let lastSalesItem = await SalesItemsDao.selectLastSalesItem();
                return ({result: true, message: "Sucesso na inserção!", id: lastSalesItem.data[0].id});
            } else {
                console.log("Erro na inserção!");
                return ({result: false, message: "Erro na inserção!"});
            }
        } catch(error) {
            console.log(error);
            return ({result: false, message: error});
        }
    },

    async selectAllSalesItems(sales) {
        try {
            var connection = await connectionDB.openConnectionDB();
            const result = await connection.promise().execute('SELECT * FROM salesItems WHERE id_sale = ?', [sales.id_sale]);
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

    async updateSalesItem(salesItemModel) {
        try {
            var connection = await connectionDB.openConnectionDB();
            var result = await connection.execute(
                `UPDATE salesItems SET  id_packedLunch = ?, observations = ?, qtd = ? WHERE id = ?`, 
                [salesItemModel.id_packedLunch, salesItemModel.observations, salesItemModel.qtd, salesItemModel.id]
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

    async deleteSalesItem(salesItemModel) {
        try {
            var connection = await connectionDB.openConnectionDB();
            var result = await connection.execute(`DELETE FROM salesItems WHERE id_sale = ?`, [salesItemModel.id_sale]);
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
    }
};

module.exports = SalesItemsDao;
