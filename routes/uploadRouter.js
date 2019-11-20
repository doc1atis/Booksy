const express = require("express");
const AWS = require("aws-sdk");
AWS.config.region = "us-east-1";
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_Access_Key_ID,
  secretAccessKey: process.env.AWS_Secret_Access_Key
});
const multiUpload = require("../controllers/uploadFiles");
const { Book } = require("../models/BookModel");
const auth = require("../controllers/authentication");
const router = express.Router();
router.get("/", auth.isLoggedIn, (req, res) => {
  res.render("uploadForm");
});
router.post("/", auth.isLoggedIn, multiUpload, async (req, res) => {
  let validBook = true;
  let book;
  try {
    if (req.files.bookCover && req.files.content) {
      book = new Book({
        title: req.body.title,
        cover: req.files.bookCover[0].location,
        authors: req.body.authors.split(","),
        bookSummary: req.body.bookSummary,
        price: req.body.price,
        content: req.files.content[0].location,
        category: req.body.category,
        uploadedBy: req.user._id
      });
      await book.save();
    } else {
      throw "both files must be given";
    }
  } catch (error) {
    console.log("olgy mongoose error was: ", error);
    validBook = false;
  }

  if (req.files.bookCover && req.files.content && validBook) {
    // save complete book here

    req.flash("successMessage", "Book uploaded successfully");
    res.redirect("/upload");
  } else {
    for (let prop in req.files) {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.files[prop][0].key
      };
      s3.deleteObject(params, function(err, data) {
        if (err) {
          console.log("there was an error deleting olgy: ", err);
        } else {
          console.log("deleted olgy");
        }
      });
    }
    // save the incomplete book here
    // put it's id in a hidden input
    req.flash("errorMessage", "all input must be valid");
    req.flash("oldInputsUpload", req.body);
    res.redirect("/upload");
  }
  // do stufss here before saving book
  // await book.save();
});
module.exports = router;
