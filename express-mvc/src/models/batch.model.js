const mongoose = require("mongoose");

const batchSchema = mongoose.Schema({
    "name" : {type : String, require : true}
},
{
    versionKey : false,
    timestamps : true,
});

module.exports = mongoose.model("batch",batchSchema);