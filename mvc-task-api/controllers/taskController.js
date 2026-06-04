const tasks = require("../models/taskModel");

exports.getTasks = (req, res) => {
  res.json(tasks);
};

exports.addTask = (req, res) => {
  tasks.push(req.body);
  res.json({ message: "Task Added" });
};