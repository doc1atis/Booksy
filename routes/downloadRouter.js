const express = require("express");
const fs = require("fs");
const router = express.Router();
router.get("/", (req, res) => {
  // get file path from mongodb using the book ID,
  const filePath = "path of file from mongodb";
  const file = fs.createReadStream(filePath);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename= ${filePath}`);
  file.pipe(res);
});
module.exports = router;
