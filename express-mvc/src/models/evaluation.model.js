const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
    "instructor" : {type : mongoose.Schema.Types.ObjectId,
                    ref : "user",
                    require : true},
    "batch" : {type : mongoose.Schema.Types.ObjectId,
                ref : "batch",
                require : true}
},
{
    versionKey : false,
    timestamps : true,
});

module.exports = mongoose.model("evaluation",evaluationSchema);