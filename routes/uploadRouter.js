const express = require("express");
const aws = require("aws-sdk");
const validateBook = require("../controllers/validation/validateBook");
const fs = require("fs");
const { Book } = require("../models/BookModel");
const auth = require("../controllers/authentication");

const router = express.Router();
aws.config.region = "us-east-2";
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

router.get("/", auth.isLoggedIn, (req, res) => {
  res.render("uploadForm");
});
// new post route to upload to aws
router.post("/aws", (req, res) => {
  const s3 = new aws.S3();
  const { bookCover, content } = req.files;
  const files = [bookCover[0], content[0]];
  for (let i = 0; i < files.length; i++) {
    const fileName = files[i].filename;
    const fileType = files[i].mimetype;
    const s3Params = {
      Bucket: S3_BUCKET_NAME,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: "public-read"
    };
    s3.getSignedUrl("putObject", s3Params, (err, data) => {
      if (err) {
        console.log(err);
        return res.send("olgy there was an error uploading");
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`
      };
      res.write(JSON.stringify(returnData));
      res.send("file was upload to aws olgy");
    });
  }
});
// post ends
router.post("/", auth.isLoggedIn, async (req, res) => {
  req.flash("oldInputsUpload", req.body);
  req.body.authors = req.body.authors.split(",");
  const { error } = validateBook(req.body);
  const { bookCover, content } = req.files;
  if (error) {
    if (bookCover) {
      fs.unlink(bookCover[0].path, er => {});
    }
    if (content) {
      fs.unlink(content[0].path, er => {});
    }
    req.flash("errorMessage", error.details[0].message);
    return res.status(400).redirect("/upload");
  }
  if (!bookCover && !content) {
    req.flash("errorMessage", "please provide a valid cover image and content");
    return res.status(400).redirect("/upload");
  }
  let paths = [];
  if (!bookCover) {
    req.flash("errorMessage", "please enter a valid book cover image");
    res.status(400).redirect("/upload");
  } else {
    paths.push(bookCover[0].path);
  }

  if (!content) {
    req.flash("errorMessage", "please enter a valid pdf book content");
    res.status(400).redirect("/upload");
  } else {
    paths.push(content[0].path);
  }

  if (paths.length !== 2 || paths.length === 1) {
    return fs.unlink(paths[0], er => {});
  }
  const book = new Book({
    ...req.body,
    content: content[0].filename,
    cover: bookCover[0].filename,
    uploadedBy: req.user._id
  });
  await book.save();
  req.flash("successMessage", "Book uploaded successfully");
  res.redirect("/upload");
});
module.exports = router;
