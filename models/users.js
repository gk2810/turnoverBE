const { Sequelize, DataTypes } = require("sequelize");
const { DBconn } = require("../utils/DBconnection");
let { sequelize } = require("../index");
// let seq;

// (async () => {
//     seq = await DBconn()
// })();

// let Users = sequelize.define("users", {
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// })

// exports.Users = Users