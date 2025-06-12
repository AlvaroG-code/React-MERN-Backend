const express = require("express");
require("dotenv").config();
const cors = require("cors");
//Importar la conexión a la base de datos
const { dbConnection } = require("./database/config");

//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

// app.use();

//directorio público
app.use(express.static("public"));

//Lectura y parseo del body
app.use(express.json());

//Importar las rutas
app.use("/api/auth", require("./routes/auth")); // Rutas de autenticación
app.use("/api/events", require("./routes/events")); // Rutas de eventos

//Escuchar peticiones HTTP
app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});
