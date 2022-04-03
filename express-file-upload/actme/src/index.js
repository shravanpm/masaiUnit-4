const express = require("express");
const userController = require("./controllers/User")
const app = express()

app.use("/users",userController);

module.exports=app