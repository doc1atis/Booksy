// const JOI = require("joi");
// module.exports = function(book) {
//   const schema = {
//     title: JOI.string()
//       .required()
//       .min(5)
//       .max(70),
//     price: JOI.number()
//       .required()
//       .positive(),
//     authors: JOI.string()
//       .required()
//       .min(1)
//       .max(150),
//     bookSummary: JOI.string()
//       .required()
//       .min(20)
//       .max(500),
//     category: JOI.string()
//       .required()
//       .min(5)
//       .max(20)
//   };
//     if (book.title.length >= 5) {

//     }
//   return JOI.validate(book, schema);
// };
