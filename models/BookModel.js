const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cover: { type: String, required: true },
  authors: [{ type: String, required: true }],
  bookSummary: { type: String, required: true },
  price: { type: Number, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
});

exports.Book = mongoose.model("Book", bookSchema);
exports.bookSchema = bookSchema;
