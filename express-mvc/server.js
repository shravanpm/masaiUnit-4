const app = require("./index");

// const mongoose = require("mongoose");
const connect = require("./src/config/db");
app.listen(5000, async(req,res)=>{
    
    try {
    
        await connect();
        console.log("listening in 5000")
    } catch (error) {
        console.log(error);
    }
})