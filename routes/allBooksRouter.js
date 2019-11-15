const express = require("express");
const { Book } = require("../models/BookModel");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    res.render("allBooks", { books: await Book.find() });
  } catch (error) {
    res.status(404).send("Error finding Books");
  }
});
module.exports = router;
