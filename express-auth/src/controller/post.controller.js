const express = require("express");

const router = express.Router();
const Post = require("../models/post.model");

const authenticate = require("../middlewear/authenticate");

router.post("/",authenticate, async(req,res) => {
    req.body.user_id = req.userID;
    try{
        const post = await Post.create(req.body)
        return res.status(200).send(post)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
});

router.get("/",authenticate,async (req,res) =>{
    try {
        const posts = await Post.find({user_id : req.userID})
        .populate({path : "user_id",select:["name"]})
        .lean().exec();
        return res.status(200).send(posts)
    } catch (err) {
        return res.status(400).send({message : err.message})
    }
})

router.get("/:id",authenticate,async (req,res) =>{
    try {
        const posts = await Post.findById(req.params.id)
        .populate({path : "user_id",select:["name"]})
        .lean().exec();
        return res.status(200).send(posts)
    } catch (err) {
        return res.status(400).send({message : err.message})
    }
})

router.patch("/:id",authenticate,async (req,res) =>{
    try {
        const posts = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true})
        .populate({path : "user_id",select:["name"]})
        .lean().exec();
        return res.status(200).send(posts)
    } catch (err) {
        return res.status(400).send({message : err.message})
    }
})

router.delete("/:id",authenticate,async (req,res) =>{
    try {
        const posts = await Post.findByIdAndDelete(req.params.id)
        .lean().exec();
        return res.status(200).send(posts)
    } catch (err) {
        return res.status(400).send({message : err.message})
    }
})
module.exports = router;