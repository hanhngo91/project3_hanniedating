const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");

router.get("/", (req, res) => {
  res.send("Hello from messages");
});

module.exports = router;
