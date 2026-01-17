const express = require("express");
const cors = require("cors");
require("dotenv").config();
const quizRoutes = require("./routes/quizRoutes");

const app = express();

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/quiz", quizRoutes);

const PORT = process.env.PORT || 5001;
if (process.env.NODE_ENV === "production") {
  app.listen(PORT, () => console.log("server running", { PORT }));
}

module.exports = app;
