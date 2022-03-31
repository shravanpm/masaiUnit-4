const express = require("express");
const mongoose = require("mongoose");



const app = express();
const connect = require("./config/db");
app.use(express.json());
// console.log(app)
const {register,login} = require("./controller/auth.controller");
const postController = require("./controller/post.controller");


app.post("/register", register)

app.post("/login", login)

app.use("/post",postController);







module.exports = app;