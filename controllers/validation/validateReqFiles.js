const JOI = require("joi")
module.exports = function (book) {
    const schema = {
        bookCover: JOI.string().required(),
        content: JOI.string().required()
    }
    return JOI.validate(book, schema)
}