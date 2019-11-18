const express = require("express");
const auth = require("../controllers/authentication");
const router = express.Router();
function isLoggedOut(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect("back");
}

router.get("/", isLoggedOut, (req, res) => {
  res.render("login", { oldInputs: req.flash("formOld") });
});
function flashOldinputs(req, res, next) {
  req.flash("formOld", req.body);
  next();
}
router.post("/", flashOldinputs, isLoggedOut, auth.login());
module.exports = router;
