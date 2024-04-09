const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");
const { Route } = require("./routes/users");
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swagger_options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node JS API for Assessment",
            version: "1.0.0"
        },
        server: [
            {
                url: "https://turnoverbe.onrender.com"
            }
        ]
    },
    apis: ["./routes/users.js"]
}

const swaggerSpecs = swaggerJSDoc(swagger_options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

let corsOptions = {
    origin: "*",
    allowedHeaders: ['Content-Type', 'Authorization']

}
app.use("", cors(corsOptions))

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("", Route);

// const sequelize = new Sequelize(process.env.DB_URL);
// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
// }).catch(error => {
//     console.error('Unable to connect to the database:', error);
// })
// exports.sequelize = sequelize;

let port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});