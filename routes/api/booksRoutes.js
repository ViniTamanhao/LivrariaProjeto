const express = require("express");
const router = express.Router();
const booksController = require("../../controllers/booksController");

router
  .route("/")
  .get(booksController.getBook)
  .post(booksController.createNewBook)
  .patch(booksController.updateBook)
  .delete(booksController.deleteBook);

module.exports = router;
