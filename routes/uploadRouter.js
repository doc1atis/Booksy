const express = require("express")
const validateBook = require("../controllers/validation/validateBook")
const fs = require("fs")
const Book = require("../models/BookModel")
const auth = require("../controllers/authentication")

const router = express.Router()
router.get("/", auth.isLoggedIn, (req, res) => {
    res.render("uploadForm")
})

router.post("/", auth.isLoggedIn, async (req, res) => {
    req.body.authors = req.body.authors.split(",")
    const { error } = validateBook(req.body)
    const { bookCover, content } = req.files
    if (error) {
        if (bookCover) {
            fs.unlink(bookCover[0].path, er => { })
        }
        if (content) {
            fs.unlink(content[0].path, er => { })
        }
        req.flash("errorMessage", error.details[0].message)
        return res.status(400).redirect("/upload")
    }
    if (!bookCover && !content) {
        req.flash("errorMessage", "please provide a valid cover image and content")
        return res.status(400).redirect("/upload")
    }
    let paths = []
    if (!bookCover) {
        req.flash("errorMessage", "please enter a valid book cover image")
        res.status(400).redirect("/upload")
    } else {
        paths.push(bookCover[0].path)

    }

    if (!content) {
        req.flash("errorMessage", "please enter a valid pdf book content")
        res.status(400).redirect("/upload")
    } else {
        paths.push(content[0].path)

    }

    if (paths.length !== 2 || paths.length === 1) {
        return fs.unlink(paths[0], er => { })
    }

    const book = new Book({
        ...req.body,
        content: content[0].path,
        cover: bookCover[0].path,
        uploadedBy: req.user._id,
    })
    await book.save()
    req.flash("successMessage", "Book uploaded successfully")
    res.redirect("/upload")


})
module.exports = router