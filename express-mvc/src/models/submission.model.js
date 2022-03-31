const mongoose = require("mongoose");

const submissionSchema = mongoose.Schema({
    "marks" : {type : Number, require : true},
    "evaluationId" : {type : mongoose.Schema.Types.ObjectId,ref : "evaluation",require : true},
    "studentId" : {type : mongoose.Schema.Types.ObjectId,ref : "user",require : true}  
     },
{
    versionKey : false,
    timestamps : true,
});

const SubMission = mongoose.model("examSubmission",submissionSchema);
module.exports = SubMission

