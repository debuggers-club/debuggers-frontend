const express = require("express");
const backend = express.Router();
const login = require("./routes/login");

backend.get("/", (req, res) => {
  res.send("Hello From Backend");
});

backend.use("/login", login);

module.exports = backend;
