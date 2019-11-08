const express = require("express");
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("back");
}
const logoutRouter = express.Router();
logoutRouter.get("/", isLoggedIn, (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = logoutRouter;