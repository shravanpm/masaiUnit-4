const  mongoose  = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    profilePic: { type: String, required: false },

},
{
  versionKey: false,
  timestamps: true,
})
module.exports = mongoose.model("user", UserSchema);
