const morgan = require("morgan");
const { storage, fileFilter } = require("../uploadFiles");
const multer = require("multer");
const auth = require("../authentication");
const express = require("express");

const requestLog = require("debug")("app:requestLog");
module.exports = function(app) {
  auth.runPassport(app);
  app.set("view engine", "ejs");
  if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    requestLog("morgan is enabled because app is in development phase");
  }
  app.use(express.static("public"));
  app.use(express.static("MyUploads"));
  // make req.body available as an plain object
  //app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    multer({
      storage,
      fileFilter
    }).fields([
      { name: "bookCover", maxCount: 1 },
      { name: "content", maxCount: 1 }
    ])
  );
  app.use(function(req, res, next) {
    res.locals.user = req.user;
    res.locals.errorMessage = req.flash("errorMessage");
    res.locals.successMessage = req.flash("successMessage");
    next();
  });
};
