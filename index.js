const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");
const { Route } = require("./routes/users");
const cors = require("cors");

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