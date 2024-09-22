const connectionDB = require("../ConnectionDB");

const SalesDao = {
    
    async insertSale(saleModel) {
        try {
            var connection = await connectionDB.openConnectionDB();
            var results = await connectionDB.executeQuery(connection, 
                `INSERT INTO sales (date_time, codeSale, id_user) VALUES ("${saleModel.date_time}", "${saleModel.codeSale}", ${saleModel.id_user})`
            );
            await connection.end();
            
            if(results != null) {
                console.log("Sucesso na inserção!");
                let lastSale = await SalesDao.selectLastSale();
                return ({result: true, message: "Sucesso na inserção!", id: lastSale.data[0].id});
            } else {
                console.log("Erro na inserção!");
                return ({result: false, message: "Erro na inserção!"});
            }
        } catch(error) {
            console.log(error);
            return ({result: false, message: error});
        }
    },

    async selectAllSales() {
        try {
            var connection = await connectionDB.openConnectionDB();
            const result = await connection.promise().execute('SELECT * FROM sales');
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

    async selectAllSalesFromUsers(saleModel) {
        try {
            var connection = await connectionDB.openConnectionDB();
            const result = await connection.promise().execute('SELECT * FROM sales WHERE id_user = ?', [saleModel.id_user]);
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

    async selectTotalValuePerDay(startDate, endDate) {
        try {
            var connection = await connectionDB.openConnectionDB();
            const result = await connection.promise().execute(
                `SELECT DATE(date_time) AS sale_date, SUM(valueTotal) AS total_value_received 
                 FROM sales 
                 WHERE date_time BETWEEN ? AND ? 
                 GROUP BY DATE(date_time) 
                 ORDER BY sale_date ASC`,
                [startDate, endDate]
            );
            await connection.end();

            if (result != null) {
                console.log("Sucesso na seleção!");
                return ({ result: true, message: "Sucesso na seleção!", data: result[0] });
            } else {
                console.log("Erro na seleção!");
                return ({ result: false, message: "Erro na seleção!", data: [] });
            }
        } catch (error) {
            console.log(error);
            return ({ result: false, message: error, data: [] });
        }
    },

    async selectTotalPurchasesPerClient(startDate, endDate) {
        try {
            var connection = await connectionDB.openConnectionDB();
            const result = await connection.promise().execute(
                `SELECT users.id AS client_id, users.name AS client_name, COUNT(sales.id) AS total_purchases 
                 FROM sales 
                 JOIN users ON sales.id_user = users.id 
                 WHERE sales.date_time BETWEEN ? AND ? 
                 GROUP BY users.id, users.name 
                 ORDER BY total_purchases DESC`,
                [startDate, endDate]
            );
            await connection.end();

            if (result != null) {
                console.log("Sucesso na seleção!");
                return ({ result: true, message: "Sucesso na seleção!", data: result[0] });
            } else {
                console.log("Erro na seleção!");
                return ({ result: false, message: "Erro na seleção!", data: [] });
            }
        } catch (error) {
            console.log(error);
            return ({ result: false, message: error, data: [] });
        }
    },

    async selectAllSalesFromUsersCodeSale(saleModel) {
        try {
            var connection = await connectionDB.openConnectionDB();
            const result = await connection.promise().execute('SELECT * FROM sales WHERE id_user = ? AND codeSales = ?', [saleModel.id_user, saleModel.codeSale]);
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

    async selectLastSale() {
        try {
            var connection = await connectionDB.openConnectionDB();
            const result = await connection.promise().execute('SELECT * FROM sales ORDER BY id DESC LIMIT 1');
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

    async updateSale(saleModel) {
        try {
            var connection = await connectionDB.openConnectionDB();
            var result = await connection.execute(
                `UPDATE sales SET date_time = ?, codeSale = ?, id_user = ? WHERE id = ?`, 
                [saleModel.date_time, saleModel.codeSale, saleModel.id_user, saleModel.id]
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

    async deleteSale(saleModel) {
        try {
            var connection = await connectionDB.openConnectionDB();
            var result = await connection.execute(`DELETE FROM sales WHERE id = ?`, [saleModel.id]);
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

module.exports = SalesDao;
