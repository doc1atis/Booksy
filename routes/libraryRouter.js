const express = require("express")
const auth = require("../controllers/authentication")
const router = express.Router()
router.get('/', auth.isLoggedIn, (req, res) => {
    res.send("I will render your library")
})
router.get('/download/:id', (req, res) => {
    res.send(`I will download the book with id: ${req.params.id}`)
})
module.exports = router