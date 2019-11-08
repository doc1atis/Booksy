const JOI = require("joi")
module.exports = function (book) {
    const schema = {
        title: JOI.string().required().min(5).max(70),
        price: JOI.number().required().positive(),
        authors: JOI.array().required().min(1).max(6),
        bookSummary: JOI.string().required().min(50).max(500),
        category: JOI.string().required().min(5).max(20)

    }
    return JOI.validate(book, schema)
}