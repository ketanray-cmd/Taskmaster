import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
app.use(cors());
app.use(express.json());

// DB Connection
const db = await mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database: "task_db",
});

// GET tasks
app.get("/tasks", async (req, res) => {
try {
const [rows] = await db.query("SELECT * FROM tasks");
res.json(rows);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// ADD task
app.post("/tasks", async (req, res) => {
try {
const { title, status } = req.body;


await db.query("INSERT INTO tasks (title, status) VALUES (?, ?)", [
  title,
  status,
]);

res.json({ success: true });


} catch (err) {
res.status(500).json({ error: err.message });
}
});

// UPDATE task status
app.put("/tasks/:id/status", async (req, res) => {
try {
const { status } = req.body;
const { id } = req.params;


await db.query("UPDATE tasks SET status = ? WHERE id = ?", [status, id]);

res.json({ success: true, id, status }); // ALWAYS JSON

} catch (err) {
console.error("Status update error:", err);
res.status(500).json({ error: err.message });
}
});

app.listen(5000, () => console.log("Server running on port 5000"));
