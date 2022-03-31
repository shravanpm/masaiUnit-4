const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    "firstName" : {type : String, require : true},
    "lastName" : {type : String, require : true},
    "gender" : {type : String, require : true,
        enum : ["male","female","other"]},
    "dob" : {type : String, require : true},
    "type" : {type : String,
        enum : ["student","instructor","admin"] ,require : true,}
},
{
    versionKey : false,
    timestamps : true,
});

module.exports = mongoose.model("user",userSchema);