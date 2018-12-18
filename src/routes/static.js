//define all routes

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Welcome to Bookstore");
});

module.exports = router;

