const express = require("express")
const Book = require("../models/BookModel")
const router = express.Router()
router.get("/", (req, res) => {
    res.render("uploadForm")
})
router.post("/", async (req, res) => {
    // do some validation to prevent file from uploading here usin JOI
    try {
        if (!req.files) {
            return res.status(400).send("invalid file type")
        }
        const book = new Book({
            title: req.body.title,
            price: req.body.price,
            authors: req.body.authors.split(","),
            cover: req.files.bookCover[0].path,
            preview: req.body.bookSummary,
            content: req.files.content[0].path
        })
        await book.save()
        res.send("cover uploaded")
    } catch (error) {
        res.status(400).send(error)
    }

})
module.exports = router