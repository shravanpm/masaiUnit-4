const express = require("express");


const app = express();

app.get("",async (req,res) => {
    try {
        res.send("hello");
    } catch (error) {
        
    }
})

app.get("/books",async (req,res) => {
    try {
        res.send({
            book1 : "got",
            book2 : "harry porter",
            book3 : "wings of fire",
            book4 : "stranger things"
        });
    } catch (error) {
        
    }
})
app.listen(5001,async() => {
    try {
        console.log("listening in 5001")
    } catch (error) {
        console.log(error)
    }
} )