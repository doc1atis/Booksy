const express = require("express");
const auth = require("../controllers/authentication");
const router = express.Router();
function isLoggedOut(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect("back");
}
router.get("/", isLoggedOut, (req, res) => {
  // show register form
  res.render("register");
});

router.post("/", isLoggedOut, (req, res) => {
  auth.register(req, res);
});
module.exports = router;
