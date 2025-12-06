require("dotenv").config();
const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Get tasks
app.get("/tasks", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM tasks");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add task
app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;
    await db.query("INSERT INTO tasks (title) VALUES (?)", [title]);
    res.json({ message: "Task added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
