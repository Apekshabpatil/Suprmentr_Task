const express = require("express");
const app = express();

app.get("/books", (req, res) => {
  res.json([
    { id: 1, title: "Atomic Habits" },
    { id: 2, title: "Rich Dad Poor Dad" }
  ]);
});

app.get("/authors", (req, res) => {
  res.json([
    { id: 1, name: "James Clear" },
    { id: 2, name: "Robert Kiyosaki" }
  ]);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});