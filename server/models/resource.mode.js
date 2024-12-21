const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["article", "video", "podcast", "guide", "tool"],
    required: true,
  },
  category: {
    type: String,
    enum: ["anxiety", "depression", "stress", "self-care", "mindfulness"],
    required: true,
  },
});

const resource = mongoose.model("Resource", resourceSchema);
module.exports = resource;
