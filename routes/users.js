const Route = require("express").Router();
const { signup, login, protectedData, markCategory, getMarkedData } = require("../controller/users");
const { fakerData } = require("../models/f");
const { auth } = require("../middleware/auth");

Route.post("/signup", signup);
Route.post("/login", login);
Route.get("/fakeData", fakerData);
Route.get('/getData', auth, protectedData);
Route.get('/getMarkedData', auth, getMarkedData);
Route.post("/markCategory", auth, markCategory);

exports.Route = Route