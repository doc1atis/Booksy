// for s3 starts
const uuid = require("uuid/v4");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
// for s3 ends

AWS.config.region = "us-east-1";
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_Access_Key_ID,
  secretAccessKey: process.env.AWS_Secret_Access_Key
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, `${uuid()}-UPOLGY-${file.originalname}`);
    }
  }),

  fileFilter: function(req, file, cb) {
    if (file.fieldname === "bookCover" && file.mimetype === "image/jpeg") {
      return cb(null, true);
    }
    if (file.fieldname === "content" && file.mimetype === "application/pdf") {
      return cb(null, true);
    }
    return cb(null, false);
  }
});
const multiUpload = upload.fields([
  { name: "bookCover", maxCount: 1 },
  { name: "content", maxCount: 1 }
]);
module.exports = multiUpload;
