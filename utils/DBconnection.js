const { Sequelize } = require("sequelize");
require("dotenv").config();

exports.DBconn = async () => {
    try {
        const sequelize = new Sequelize(process.env.DB_URL);
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return sequelize
    } catch (error) {
        console.log("error in DB connection");
    }
}