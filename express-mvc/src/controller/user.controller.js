const mongoose = require("mongoose");
const express = require("express");

const route = express.Router();

const User = require("../models/user.model");

route.post("/", async(req,res) => {
    try {
        const user =await User.create(req.body);
        res.send(user)
    } catch (error) {
        res.send(error.message);   
    }
})

route.get("/", async(req,res) => {
    try {
        const users =await User.find().lean().exec();
        res.send(users)
    } catch (error) {
        res.send(error.message);   
    }
})

route.get("/:id", async(req,res) => {
    try {
        const user =await User.findById(req.params.id).lean().exec();
        res.send(user)
    } catch (error) {
        res.send(error.message);   
    }
})

route.patch("/:id", async(req,res) => {
    try {
        const user =await User
        .findById(req.params.id,req.body,{new:true})
        .lean().exec();
        res.send(user)
    } catch (error) {
        res.send(error.message);   
    }
})

route.delete("/:id", async(req,res) => {
    try {
        const user =await User.findByIdAndDelete(req.params.id).lean().exec();
        res.send(user)
    } catch (error) {
        res.send(error.message);   
    }
})


module.exports = route;