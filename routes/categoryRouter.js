const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.send("I will search books in that category and render allbooks page");
});
module.exports = router;
