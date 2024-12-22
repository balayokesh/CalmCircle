const express = require("express");
const router = express.Router();
const Mood = require("../models/mood.model");

const authenticateUser = require("../controllers/authenticate.js");

// Task 1: Log Mood (POST request to log a new mood entry)
router.post("/log", authenticateUser, async (req, res) => {
  const { userId, mood, notes } = req.body;

  try {
    // Create a new mood entry
    const newMood = new Mood({ userId, mood, notes });
    await newMood.save();
    res
      .status(201)
      .json({ message: "Mood logged successfully!", mood: newMood });
  } catch (error) {
    res.status(500).json({ error: "Failed to log mood." });
  }
});

// Task 2: Get Mood History (GET request to retrieve mood history for a user)
router.get("/history/:userId", authenticateUser, async (req, res) => {
  const { userId } = req.params;

  try {
    const moods = await Mood.find({ userId }).sort({ timestamp: -1 }); // Sorting by timestamp
    res.status(200).json(moods);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve mood history." });
  }
});

// Task 3: Update Mood Entry with Reflection (PUT request to add/edit notes on a mood entry)
router.put("/update/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { notes } = req.body;

  try {
    // Find the mood entry by ID and update the notes field
    const updatedMood = await Mood.findByIdAndUpdate(
      id,
      { notes },
      { new: true }
    );
    if (!updatedMood) {
      return res.status(404).json({ error: "Mood entry not found." });
    }
    res
      .status(200)
      .json({ message: "Mood updated successfully!", updatedMood });
  } catch (error) {
    res.status(500).json({ error: "Failed to update mood." });
  }
});

module.exports = router;
