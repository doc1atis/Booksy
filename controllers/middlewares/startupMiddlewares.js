const morgan = require("morgan");
const auth = require("../authentication")
const express = require("express")
const requestLog = require("debug")("app:requestLog");
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
    // get flash messages here
    app.use(function (req, res, next) {
        res.locals.message = req.flash('message')
        res.locals.user = req.user


        // res.locals.username = req.user.username
        next()
    })
}
