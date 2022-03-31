const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    "roll-id" : {type : String, require : true},
    "batchId" : {type : mongoose.Schema.Types.ObjectId,ref : "batch", require : true},
    "userId" : {type : mongoose.Schema.Types.ObjectId,ref : "user", require : true}
},
{
    versionKey : false,
    timestamps : true,  
});

module.exports = mongoose.model("submission",studentSchema);