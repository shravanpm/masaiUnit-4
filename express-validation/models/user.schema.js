//first_name, last_name, email, pincode, age, gender,

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    "first_name" : {type : String,require : true},
    "last_name" : {type : String, require :true},
    "email" : {type : String, require : true},
    "pincode" : {type : String, require : true},
    "age" : {type : String, require : true},
    "gender" : {type : String, require : true}
});

module.exports = mongoose.model("user",userSchema);