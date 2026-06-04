const express = require("express");
const app = express();

app.use(express.json());

const taskRoutes = require("./routes/taskRoutes");

app.use("/tasks", taskRoutes);
app.get("/", (req, res) => {
  res.send("MVC Server Working");
});

app.listen(5000, () => {
  console.log("MVC Server running on port 5000");
});