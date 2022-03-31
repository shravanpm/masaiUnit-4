const mongoose = require("mongoose");
const express = require("express");

const route = express.Router();

const Submission = require("../models/submission.model");

route.post("/", async(req,res) => {
    try {
        let submission =await Submission.create(req.body);
        res.send(submission)
    } catch (error) {
        res.send(error.message);   
    }
})

route.get("/", async(req,res) => {
    try {
        let submissions =await Submission.find()
        .populate([{path:"studentId",
        select : ["firstName","lastName"]},])
        .lean().exec();
        res.send(submissions)
    } catch (error) {
        res.send(error.message);   
    }
})

route.get("/:id", async(req,res) => {
    try {
        let submission =await Submission.findById(req.params.id)
        .populate([{path:"studentId",
        select : ["firstName","lastName"]},])
        .lean().exec();
        res.send(student)
    } catch (error) {
        res.send(error.message);   
    }
})

route.patch("/:id", async(req,res) => {
    try {
        const submission =await Submission
        .findByIdAndUpdate(req.params.id,req.body,{new : true})
        .populate([{path:"studentId",
        select : ["firstName","lastName"]},])
        .lean().exec();
        res.send(student)
    } catch (error) {
        res.send(error.message);   
    }
})

route.delete("/:id", async(req,res) => {
    try {
        const submission =await Submission
        .findByIdAndDelete(req.params.id)
        .populate([{path:"studentId",
        select : ["firstName","lastName"]},])
        .lean().exec();
        res.send(student)
    } catch (error) {
        res.send(error.message);   
    }
})

module.exports = route;