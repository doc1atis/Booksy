const express = require("express")
const auth = require("../controllers/authentication")
const router = express.Router()
router.get("/", (req, res) => {
    res.render("login")
})
router.post("/", auth.login(), (req, res) => {
})
module.exports = router