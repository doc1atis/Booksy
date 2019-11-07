const morgan = require("morgan");
const multer = require("multer")
const uuid = require("uuid/v4")
const auth = require("../authentication")
const express = require("express")
const requestLog = require("debug")("app:requestLog");
//================file storage =================
const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "MyUploads")
    },
    filename: (req, file, callback) => {
        callback(null, uuid() + "pik-" + file.originalname)
    }
})
// =============== file storage filter
const fileFilter = (req, file, callback) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "application/pdf") {
        callback(null, true)
    } else {
        callback(null, false)
    }
}
module.exports = function (app) {
    auth.runPassport(app)
    app.set("view engine", "ejs");
    if (app.get("env") === "development") {
        app.use(morgan("tiny"));
        requestLog("morgan is enabled because app is in development phase")
    }
    app.use(express.static("public"));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    //====================== UPLOAD FILES ===================
    // bookCover --> is name="bookCover" from the form input
    app.use(multer({
        storage: fileStorage,
        fileFilter
    }).fields([
        { name: "bookCover", maxCount: 1 },
        { name: "content", maxCount: 1 }
    ]))
    // get flash messages here
    app.use(function (req, res, next) {
        res.locals.user = req.user
        res.locals.errorMessage = req.flash("errorMessage")
        res.locals.successMessage = req.flash("successMessage")
        next()
    })
}
