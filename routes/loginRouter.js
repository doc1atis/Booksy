const express = require("express");
const auth = require("../controllers/authentication");
const router = express.Router();
router.get("/", (req, res) => {
  res.render("login", { errorMessage: req.flash().error });
});
router.post("/", auth.login());

module.exports = router;
