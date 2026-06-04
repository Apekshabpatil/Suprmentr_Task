const express = require("express");
const app = express();

app.use(express.json());

let tasks = [];

app.get("/", (req, res) => {
  res.send("Task API Running");
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  tasks.push(req.body);
  res.json({ message: "Task Added" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
