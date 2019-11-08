const mongoose = require("mongoose")
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    cover: { type: String, required: true },
    authors: [{ type: String, required: true }],
    preview: { type: String, required: true },
    price: { type: Number, required: true },
    content: { type: String, required: true },
    category: { type: String, required: false }
})
module.exports = mongoose.model("Book", bookSchema)