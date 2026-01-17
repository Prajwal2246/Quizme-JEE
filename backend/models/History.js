const mongoose = require("mongoose");
const historySchema = new mongoose.Schema({
  userId: { type: String, required: true }, // From Firebase Auth
  topic: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  difficulty: String,
  timeSpent: Number,
  // Store answers to allow for later review
  userAnswers: Array,
});

module.exports = mongoose.model("History", historySchema);
