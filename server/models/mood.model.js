const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mood: {
    type: String,
    enum: ["happy", "sad", "anxious", "angry", "excited", "neutral"],
    required: true,
  },
  notes: {
    type: String,
    default: "",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const mood = mongoose.model("Mood", moodSchema);
module.exports = mood;
