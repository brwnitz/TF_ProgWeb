const routes = require('./routes/Routes.js')
const dbtables = require("./database/ConnectionDB.js");
const bodyParser = require('body-parser')
const express = require("express");
const cors = require('cors');


const app = express();
app.use(cors());
app.use("/public/uploads", express.static("public/uploads"));


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routes)

dbtables.createDBAndTables();

const port = 3001;
app.listen(port, () => {
    console.log("Runing! - Servidor iniciado e executando na porta: " + port);
});