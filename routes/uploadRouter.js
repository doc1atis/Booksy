const express = require("express")
const fs = require("fs")
const Book = require("../models/BookModel")
const auth = require("../controllers/authentication")
const router = express.Router()
router.get("/", auth.isLoggedIn, (req, res) => {
    res.render("uploadForm")
})

router.post("/", auth.isLoggedIn, async (req, res) => {
    // validate with joi here first
    let paths = []
    if (req.files.bookCover) {
        paths.push(req.files.bookCover[0].path)
    }
    if (req.files.content) {
        paths.push(req.files.content[0].path)
    }
    if (paths.length !== 2 && paths[0]) {
        console.log("path is not complete: ", paths);
        return fs.unlink(paths[0], error => {
            if (error) {
                res.send(error)
            } else {
                if (!req.coverIsGiven) res.send("invalid image file")
                if (!req.contentIsGiven) res.send("invalid content file, it must be a pdf")

            }
        })
    }
    try {
        if (!req.coverIsGiven) {
            return res.send("please upload a valid cover image")
        }
        if (!req.contentIsGiven) {
            return res.send("please enter your book content as pdf")
        }
        const book = new Book({
            title: req.body.title,
            price: req.body.price,
            authors: req.body.authors.split(","),
            cover: req.files.bookCover[0].path,
            preview: req.body.bookSummary,
            content: req.files.content[0].path,
            category: "scify"
        })
        const savedBook = await book.save()
        res.status(200).json(savedBook)


    } catch (error) {
        paths.forEach(path => {
            fs.unlink(path, error => {
                if (error) {
                    console.log(error);
                } else {

                    console.log("success deleting file");
                }
            })
        })

        res.status(400).send(error.message)

    }

})
module.exports = router