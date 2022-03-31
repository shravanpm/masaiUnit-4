const mongoose = require("mongoose");
const express = require("express");

const route = express.Router();

const Evaluation = require("../models/evaluation.model");

route.post("/", async(req,res) => {
    try {
        const evaluation =await Evaluation.create(req.body);
        
        res.send(evaluation)
    } catch (error) {
        res.send(error.message);   
    }
})

route.get("/", async(req,res) => {
    try {
        const evaluations =await Evaluation.find()
        .populate([{path:"instructor",
        select : ["firstName","lastName"]},
        {path : "batch",
         select : ["name"]}])
        .lean().exec();
        res.send(evaluations)
    } catch (error) {
        res.send(error.message);   
    }
})

route.get("/:id", async(req,res) => {
    try {
        const evaluation =await Evaluation.findById(req.params.id)
        .populate([{path:"instructor",
        select : ["firstName","lastName"]},
        {path : "batch",
         select : ["name"]}])
        .lean().exec();
        res.send(evaluation)
    } catch (error) {
        res.send(error.message);   
    }
})

route.patch("/:id", async(req,res) => {
    try {
        const evaluation =await Evaluation.findByIdAndUpdate(req.params.id,req.body,{new:true})
        .populate([{path:"instructor",
        select : ["firstName","lastName"]},
        {path : "batch",
         select : ["name"]}])
        .lean().exec();
        res.send(evaluation)
    } catch (error) {
        res.send(error.message);   
    }
})

route.delete("/:id", async(req,res) => {
    try {
        const evaluation =await Evaluation.findByIdAndDelete(req.params.id)
        .populate([{path:"instructor",
        select : ["firstName","lastName"]},
        {path : "batch",
         select : ["name"]}])
        .lean().exec();
        res.send(evaluation)
    } catch (error) {
        res.send(error.message);   
    }
})

module.exports = route;