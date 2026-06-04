const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const users = [
  {
    email: "admin@gmail.com",
    role: "admin"
  },
  {
    email: "user@gmail.com",
    role: "user"
  }
];

function roleGuard(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Token Required"
    });
  }

  const decoded = jwt.verify(
    token,
    "secretkey"
  );

  if (decoded.role !== "admin") {
    return res.status(403).json({
      message: "Access Denied"
    });
  }

  next();
}

app.post("/login", (req, res) => {
  const { email } = req.body;

  const user = users.find(
    (u) => u.email === email
  );

  const token = jwt.sign(
    {
      email: user.email,
      role: user.role
    },
    "secretkey"
  );

  res.json({ token });
});

app.get(
  "/admin",
  roleGuard,
  (req, res) => {
    res.send("Welcome Admin");
  }
);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});