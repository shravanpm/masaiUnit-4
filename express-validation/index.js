const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const userController = require("./routeController/user.controller");

app.use("/user",userController);
module.exports = app;
