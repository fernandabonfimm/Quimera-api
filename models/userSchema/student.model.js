const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  answerOne: {
    type: String,
    required: false,
  },
  answerTwo: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Student", studentSchema);
