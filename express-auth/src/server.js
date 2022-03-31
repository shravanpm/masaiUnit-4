
// const express = require("express");
const mongoose = require("mongoose");

const connect = require("./config/db");

const app = require("./index")


app.listen(5000,async ()=>{
    try {
        await connect();
        console.log("listening in 5000")
    } catch (error) {
        console.log(error);
    }
})