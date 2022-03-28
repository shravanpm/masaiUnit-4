const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const app = express();
app.use(express.json());

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1/todo");
}

/**
 * firstName ( String, required)
lastName ( String, optional)
email ( String, required)
password ( String, required)
 */
const userSchema = new mongoose.Schema({
    firstName : {type:String,required:true},
    lastName : {type:String,required:false},
    email : {type:String,required:true},
    password : {type:String,required:true},
    
},
{
    versionKey:false,
    timestamps:true,
});

const User = mongoose.model("user",userSchema);

const todoSchema = new mongoose.Schema({
    title : {type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true}
},
{
    timestamps:true,
    versionKey:false,
});
const todo = mongoose.model("todo",todoSchema);

function verifyToken(token){
    return new Promise((resolve,reject) =>{
        jwt.verify(token,"hello", (err,decoded) => {
            if(err) return reject(err);
            return resolve(decoded);
        })
    })
}
const login = async (req,res)=>{
    try {
        let user = await User.findOne({email : req.body.email});
        if(!user){
            return res.status(400).send("no user found");
        }

        function checkPassword(user,x){
            if(user.password == x){
                return true;
            }
            else{
                return false;
            }
        }

        const match = user.checkPassword(user,req.body.password);

        if(!match){
            return res.status(400).send({message : "wrong email or password"})
        }else{
            const token = generateToken(user);
            
            return res.send({user,token});
        }
    } catch (error) {
        
    }
}

app.post("/register",async(req,res)=>{
    try {
        let user = await User.create(req.body);
        res.status(200).send(user);
    } catch (error) {
        res.send({message : error.message});
    }
});

app.get("/todos", async(req,res) => {
    try {
        let user = verifyToken(req.headers);
        if(user){
            const todos  = todo.find({"userId":user._id}).lean().exec();
        res.status(500).send(todos);
        }
        
    } catch (error) {
        res.send({message:error.message});
    }
});

app.post("todo", async(req,res)=>{
    
    try {
        let user = verifyToken(req.headers);
        if(user){
            const Todo = todo.create({title : req.body,
                userId : user._id});
                return res.send(Todo);  
        }  
    } catch (error) {
        
    }
});

app.get("/todos:id", async(req,res) => {
    try {
        let user = verifyToken(req.headers);
        if(user){
            const Todo  = todo.findById(req.params.id).lean().exec();
        res.status(500).send(todo);
        }else{
            res.send({message:"Not loggedIn"})
        }
        
    } catch (error) {
        res.send({message:error.message});
    }
});

app.patch("/todos:id", async(req,res) => {
    try {
        let user = verifyToken(req.headers);
        
        if(user){
            const Todo  = todo.findByIdAndUpdate(req.params.id,req.body).lean().exec();
        res.status(500).send(todo);
        }else{
            res.send({message:"Not loggedIn"})
        }
    } catch (error) {
        res.send({message:error.message});
    }
});

app.delete("/todos:id", async(req,res) => {
    try {
        let user = verifyToken(req.headers);
        if(user){
            const Todo  = todo.findByIdAndDelete(req.params.id,req.body).lean().exec();
        res.status(500).send(todo);
        }else{
            res.send({message:"Not loggedIn"})
        }
        
    } catch (error) {
        res.send({message:error.message});
    }
});

function generateToken(user){
    return jwt.sign({user},"hello");
}

app.listen(5000, async ()=>{
    try {
        await connect();
        console.log("listening");
    } catch (error) {
        console.log(error);
    }
})