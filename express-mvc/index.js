const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const batchController = require("./src/controller/batch.controller");
const evaluationController = require("./src/controller/evaluation.controller");
const studentController = require("./src/controller/student.controller");
const submissionController = require("./src/controller/submission-controller");
const userController = require("./src/controller/user.controller");

app.use("/user",userController);
app.use("/batch",batchController);
app.use("/evaluation",evaluationController);
app.use("/student",studentController);
app.use("/submission",submissionController);


module.exports = app;