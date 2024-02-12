const express = require("express");
const login = express.Router();

login.get("/", (req, res) => {
  res.send("Hello From login");
});

login.use("/login", login);

module.exports = login;
