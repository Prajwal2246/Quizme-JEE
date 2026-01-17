const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
const History = require("../models/History");

router.post("/generate", quizController.generateQuiz);
router.post("/save-history", async (req, res) => {
  try {
    const { userId, topic, score, totalQuestions, timeSpent, difficulty } =
      req.body;

    const newHistory = new History({
      userId,
      topic,
      score,
      totalQuestions,
      timeSpent,
      difficulty,
    });
    await newHistory.save();

    res.status(200).json({ message: "History saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET user history
router.get("/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    // Sort by date: -1 means "Newest First"
    const history = await History.find({ userId }).sort({ date: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

module.exports = router;
