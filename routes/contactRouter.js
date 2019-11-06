const express = require("express")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const sendEmail = require("../controllers/sendEmail")
const router = express.Router()
router.get("/", (req, res) => {
    if (req.header("from-jq-content") === "fromJquery") {
        if (req.user) {
            res.status(200).json(req.user)
        } else {
            res.status(200).json({ username: null })
        }
    } else {
        res.render("contactForm")
    }

})
router.post("/", (req, res) => {
    if (!req.user) {
        console.log(req.body.userEmail);
        console.log(req.body.emailBody);
    } else {
        console.log(req.body.emailBody);
    }
    sendEmail(req.body.emailBody, req, res)
})
module.exports = router 