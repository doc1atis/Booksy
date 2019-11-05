const express = require("express")
const router = express.Router()
router.get("/", (req, res) => {
    res.send("i will render the contact form")
})
router.post("/", (req, res) => {
    res.send("I will send your email")
})
module.exports = router