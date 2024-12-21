const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["meditation", "breathing exercise", "workout", "stretching"],
    required: true,
  },
  duration: {
    type: Number, // in minutes
    required: true,
  },
  mediaUrl: {
    type: String,
    required: false,
    default: "",
  },
});

const exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = exercise;
