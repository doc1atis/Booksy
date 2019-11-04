const express = require("express");
const auth = require("../controllers/authentication");
const router = express.Router();
router.get("/", (req, res) => {
    // show register form
    res.render("register");
});

router.post("/", (req, res) => {
    auth.register(req, res)
})
module.exports = router;