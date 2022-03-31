const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title : {type : String, required : true},
    body : {type : String, required : true},
    user_id : {type : mongoose.Schema.Types.ObjectId, ref:"user", required : true}
},{
    timestamps : true,
    versionKey : false,
})


const Post = mongoose.model("product", postSchema)

module.exports = Post;