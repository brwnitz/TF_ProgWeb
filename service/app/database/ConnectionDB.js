var mysql = require('mysql2');

var bdName = "ecommercepw1";


const connectionDB = {

    async executeQuery(connection, query) {
      return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    },
  
    async openConnectionDB(useExecute = true){
      var connection = await mysql.createConnection(
        useExecute ? {
          host: "localhost",
          user: "root",
          password: "root",
          database: bdName 
        }: {
          host: "localhost",
          user: "root",
          password: "root"
        }
      );
  
      connection.connect((err) => {
          if (err) {
            console.error('Erro ao conectar ao banco de dados:', err);
            return false;
          }
      });
  
      return connection;
    },
  
    async endConnectionDB(connection){
      connection.end((err) => {
        if (err) {
          console.error('Erro ao fechar a conexão:', err.message);
        } else {
          console.log('Conexão com o banco encerrada com sucesso.');
        }
      });
    },
  
    // Conectar ao banco de dados
    async createDBAndTables() {
      try{
  
          let connection = await connectionDB.openConnectionDB(false); 
          if(connection == false){
              return
          }
  
          // Criar o banco de dados (se ainda não existir)
          await connectionDB.executeQuery(connection, 'CREATE DATABASE IF NOT EXISTS '+bdName);
  
          // Selecionar o banco de dados
          await connectionDB.executeQuery(connection, 'USE '+bdName);
  
  
          const createUserTableQuery = `
          CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            tell VARCHAR(20),
            surname VARCHAR(100),
            email VARCHAR(255) NOT NULL,
            adress VARCHAR(255),
            adm VARCHAR(5) NOT NULL,
            password VARCHAR(40) NOT NULL
          )
        `;

        const createPackedLunchTableQuery = `
          CREATE TABLE IF NOT EXISTS packedLunch (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description TEXT NOT NULL,
            ingredients TEXT NOT NULL,
            price DOUBLE NOT NULL,
            moreInfors TEXT,
            stock INT NOT NULL,
            category INT ,
            FOREIGN KEY (category) REFERENCES category(id)
          )
        `;

        const createSaleTableQuery = `
          CREATE TABLE IF NOT EXISTS sales (
            id INT AUTO_INCREMENT PRIMARY KEY,
            date_time TIMESTAMP NOT NULL,
            codeSale VARCHAR(30) NOT NULL,
            id_user INT NOT NULL,
            FOREIGN KEY (id_user) REFERENCES users(id)
          )
        `;

        const createSalesItemsTableQuery = `
          CREATE TABLE IF NOT EXISTS salesItems (
            id INT AUTO_INCREMENT PRIMARY KEY,
            id_sale INT NOT NULL,
            id_kit INT NULL,
            id_packedLunch INT NULL,
            observations TEXT NULL,
            qtd INT NOT NULL,
            FOREIGN KEY (id_sale) REFERENCES sales(id),
            FOREIGN KEY (id_kit) REFERENCES kit(id),
            FOREIGN KEY (id_packedLunch) REFERENCES packedLunch(id)
          )
        `;

        const createKitsTableQuery = `
          CREATE TABLE IF NOT EXISTS kit (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description TEXT NOT NULL,
            category INT,
            FOREIGN KEY (category) REFERENCES category(id)
          )
        `;

        const createKitPackedLunchTableQuery = `
          CREATE TABLE IF NOT EXISTS kitItems (
            id INT AUTO_INCREMENT PRIMARY KEY,
            id_kit INT NOT NULL,
            id_packedLunch INT NOT NULL,
            qtdPackedLunch INT NOT NULL,
            FOREIGN KEY (id_kit) REFERENCES kit(id),
            FOREIGN KEY (id_packedLunch) REFERENCES packedLunch(id)
          )
        `;

        const createCategoryTableQuery = `
          CREATE TABLE IF NOT EXISTS category (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description TEXT,
            icon VARCHAR(100) NULL
          )
        `;

        const createFavTableQuery = `
          CREATE TABLE IF NOT EXISTS fav (
            id INT AUTO_INCREMENT PRIMARY KEY,
            id_user INT NOT NULL,
            id_kit INT,
            id_packedLunch INT,
            FOREIGN KEY (id_kit) REFERENCES kit(id),
            FOREIGN KEY (id_packedLunch) REFERENCES packedLunch(id),
            FOREIGN KEY (id_user) REFERENCES users(id)

          )
        `;

        const createImagesProductTableQuery = `
          CREATE TABLE IF NOT EXISTS imagesProducts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            content BLOB NOT NULL,
            type VARCHAR(10) NOT NULL,
            size INT,
            id_packedLunch INT NOT NULL,
            FOREIGN KEY (id_packedLunch) REFERENCES packedLunch(id)
          )
        `;
        
        await connectionDB.executeQuery(connection, createUserTableQuery);
        await connectionDB.executeQuery(connection, createCategoryTableQuery);
        await connectionDB.executeQuery(connection, createPackedLunchTableQuery);
        await connectionDB.executeQuery(connection, createKitsTableQuery);
        await connectionDB.executeQuery(connection, createKitPackedLunchTableQuery);
        await connectionDB.executeQuery(connection, createSaleTableQuery);
        await connectionDB.executeQuery(connection, createSalesItemsTableQuery);
        await connectionDB.executeQuery(connection, createFavTableQuery);
        await connectionDB.executeQuery(connection, createImagesProductTableQuery);
  
        await connectionDB.endConnectionDB(connection);

        console.log('Tabelas criadas com sucesso!');
              
      }catch(error){
          console.log("erro ao cria banco e tabelas " + error)
      }
  
    },  
}


  
module.exports = connectionDB;
