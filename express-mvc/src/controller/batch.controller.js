const mongoose = require("mongoose");
const express = require("express");

const route = express.Router();
const Batch = require("../models/batch.model");
route.post("/", async(req,res) => {
    try {
        console.log(req.body)
        const batch =await Batch.create(req.body);
        res.send(batch)
    } catch (error) {
        res.send(error.message);   
    }
})

route.get("/", async(req,res) => {
    try {
        const batch =await Batch.find()
        .lean().exec();
        res.send(students)
    } catch (error) {
        res.send(error.message);   
    }
})

route.get("/:id", async(req,res) => {
    try {
        const batch =await Batch.findById(req.params.id)
        .lean().exec();
        res.send(student)
    } catch (error) {
        res.send(error.message);   
    }
})

route.patch("/:id", async(req,res) => {
    try {
        const batch =await Batch.findByIdAndUpdate(req.params.id,req.body,{new : true})
        .lean().exec();
        res.send(student)
    } catch (error) {
        res.send(error.message);   
    }
})

route.patch("/:id", async(req,res) => {
    try {
        const batch =await Batch.findByIdAndDelete(req.params.id)
        .lean().exec();
        res.send(student)
    } catch (error) {
        res.send(error.message);   
    }
})



module.exports = route;