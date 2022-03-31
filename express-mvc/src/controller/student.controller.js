const mongoose = require("mongoose");
const express = require("express");

const route = express.Router();

const Student = require("../models/student.model")

route.post("/", async(req,res) => {
    try {
        const student =await Student.create(req.body);
        res.send(student)
    } catch (error) {
        res.send(error.message);   
    }
})

route.get("/", async(req,res) => {
    try {
        const students =await Student.find()
        .populate([{path:"userId",
        select : ["firstName","lastName"]},
        {path : "batchId",
         select : ["name"]}])
        .lean().exec();
        res.send(students)
    } catch (error) {
        res.send(error.message);   
    }
})

route.get("/:id", async(req,res) => {
    try {
        const student =await Student.findById(req.params.id)
        .populate([{path:"userId",
        select : ["firstName","lastName"]},
        {path : "batchId",
         select : ["name"]}])
        .lean().exec();
        res.send(student)
    } catch (error) {
        res.send(error.message);   
    }
})

route.patch("/:id", async(req,res) => {
    try {
        const student =await Student.findById(req.params.id,req.body,{new : true})
        .populate([{path:"userId",
        select : ["firstName","lastName"]},
        {path : "batchId",
         select : ["name"]}])
        .lean().exec();
        res.send(student)
    } catch (error) {
        res.send(error.message);   
    }
})

route.delete("/:id", async(req,res) => {
    try {
        const student =await Student.findByIdAndDelete(req.params.id)
        .populate([{path:"userId",
        select : ["firstName","lastName"]},
        {path : "batchId",
         select : ["name"]}])
        .lean().exec();
        res.send(student)
    } catch (error) {
        res.send(error.message);   
    }
})



module.exports = route;