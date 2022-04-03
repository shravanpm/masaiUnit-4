const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    firstname: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
