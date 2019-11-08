const multer = require("multer")
const uuid = require("uuid/v4")
exports.storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "MyUploads")


    },
    filename: (req, file, callback) => {

        callback(null, uuid() + "pik-" + file.originalname)
    }
})

exports.fileFilter = (req, file, callback) => {
    // avoid looping over 1000 of files
    const isImage = file.mimetype === "image/png" || file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    const isPdf = file.mimetype === "application/pdf"
    if (isImage || isPdf) {
        if (file.fieldname === "bookCover" && isImage) {
            req.coverIsGiven = true
            return callback(null, true)
        }
        if (file.fieldname === "content" && isPdf) {
            req.contentIsGiven = true
            return callback(null, true)
        }
        return callback(null, false)

    }
    else {

        callback(null, false)
    }
}

