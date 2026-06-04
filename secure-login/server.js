const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

let users = [];

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    email,
    password: hashedPassword
  });

  res.json({
    message: "User Registered"
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email
  );

  if (!user) {
    return res.status(404).json({
      message: "User Not Found"
    });
  }

  const match = await bcrypt.compare(
    password,
    user.password
  );

  if (!match) {
    return res.status(401).json({
      message: "Invalid Password"
    });
  }

  const token = jwt.sign(
    { email: user.email },
    "secretkey"
  );

  res.json({
    token
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});