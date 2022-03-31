const express = require("express");

const app = express();

const allbooks = (req,res,next) => {
console.log("fetching books");
next();
}

app.get("/books",allbooks,async (req,res) => {
    try {
        res.send({books : "books"})
    } catch (error) {
        res.send(error.message);
    }
})

app.get("/books/:id",allbooks,async (req,res) => {
    try {
        req.name = req.params.id
        res.send({bookName : req.name});
    } catch (error) {
        res.send(error.message);
    }
})

app.listen(5000, async() => {
    try {
        console.log("listening in 5000")
    } catch (error) {
        
    }
})
