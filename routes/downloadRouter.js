const express = require("express");
const s3s = require("s3-streams");
const AWS = require("aws-sdk");
AWS.config.region = "us-east-1";
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_Access_Key_ID,
  secretAccessKey: process.env.AWS_Secret_Access_Key
});
const router = express.Router();
router.get("/", (req, res) => {
  const downloader = s3s.ReadStream(s3, {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.query.bookContent.split("com/")[1]
  });
  downloader.pipe(res);
});
module.exports = router;
