const express = require("express");

const studentController = require("./controllers/student.controllers");

const app = express();

app.use(express.json());

app.use("/register", studentController);

module.exports = app;
