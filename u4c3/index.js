const express = require("express");
const mongoose = require("mongoose");
const {body,validationResult} = require("express-validator");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' });

var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');


const app = express();
app.use(express.json());

const connect = () =>{
    return mongoose.connect("mongodb://127.0.0.1:27017/booksCollection")
}

/*

    firstName (string, required, minimum length 3 and maximum length 30)
    lastName (string, optional, if given then minimum length 3 and maximum length 30)
    age (integer, required, should be between 1 and 150)
    email (string, required, unique)
    profileImages: (array of imageUrls and atleast 1 profile image is required)
    timestamps (string, required)

*/

const userSchema = new mongoose.Schema({
    "firstName" : {type : String, required : true},
    "lastName" : {type : String,},
    "age" : {type : Number , required : true},
    "email" : {type:String,required:true},
    "profileImage" : {type:String,required:true}
},
{
    timestamps:true,
    versionKey:false,
});

const user = new mongoose.model("users",userSchema);

app.post("user",body("firstName").trim().not().isEmpty().bail().withMessage("First name cannot be empty").isLength({min:3,max:30}).withMessage("First Name length cannot be less than 3 and not more than 30"),
body("lastName").trim().not().isEmpty().bail().withMessage("First name cannot be empty").isLength({min:3,max:30}).withMessage("First Name length cannot be less than 3 and not more than 30"),
body("age").not().isEmpty().withMessage("Age not provided").isNumeric().withMessage("age must be a number").custom((val) =>{
    if(val<1 || val > 150){
        throw new Error("Incorrect agr provided");
    }
    return true;
}),body("email").not().isEmpty().withMessage("email not provided").isEmail().withMessage("wrong credentials").custom(  async (val) =>{
    let User = await user.findOne({email : val});
    if(User){
        throw new Error("Email is already taken");
    }
    return true;
}),async (req,res) =>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.send({errors : errors.array()});
        }

         UserCard = await user.create(req.body);
         res.send(UserCard);
    } catch (error) {
        return res.status({message : error.message});
    }
})

/**
 * 
    likes (integer, minimum default is 0)
    coverImage (string, required and it can be 1 only)
    content ( string, required)
    timestamps (string, required)

 */

const bookSchema = new mongoose.Schema({
    "likes" : {type : Number, default: 0},
    "coverImage" : {type: String, required:true},
    "content" : {type : String, required:true},
    "userId" : {type : ObjectId, ref : user, required : true},
    "publicationId" : {type : ObjectId, ref : publication, required : true}
},
{
    timestamps:true,
    versionKey:false,
});

const book = new mongoose.model("book",bookSchema);


app.post("/book",
body("coverImage").not().isEmpty().withMessage("Image is required"),
body("content").not().isEmpty().withMessage("content required"), 
async (req,res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.send({errors : errors.array()});
        }

         booksCard = await book.create(req.body);
         res.send(booksCard);
    } catch (error) {
        return res.status({message : error.message});
    }
});
/**
 * 
    name ( references post collection)
    timestamps (string, required)

 */

    const publicationSchema = new mongoose.Schema({
        "name" : {type : String, required : true}
    },
    {
        timestamps : true,
        versionKey : false,
    });

    const publication = new mongoose.model("publication",publicationSchema);

    const commentSchema = new mongoose.Schema({
        "body" : {type : String, required : true},
        "bookId" : {type : ObjectId, ref : book, required : true}
    },
    {
        timestamps : true,
        versionKey : false,
    });

    const comment = new mongoose.model("comments",commentSchema);

    app.post("/comment",
    body("body").not().isEmpty().withMessage("content required"), 
    async (req,res)=>{
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.send({errors : errors.array()});
            }
    
             commentCard = await comments.create(req.body);
             res.send(commentCard);
        } catch (error) {
            return res.status({message : error.message});
        }
    });

    app.get("/user", async (req,res) =>{
        try {
            let books = book.find().limit(10).lean().exec();
            res.send(books)
        } catch (error) {
            res.send({message : error.message});
        }
    })

app.listen(5000, async function (){
    try {
        await connect();
        console.log("listening in port 5000");
    } catch (error) {
        console.log(error);
    }
})