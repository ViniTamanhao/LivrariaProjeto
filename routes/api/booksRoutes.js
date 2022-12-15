const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const booksController = require("../../controllers/booksController");

router
  .route("/")
  .get(booksController.getBook)
  .post(verifyRoles(ROLES_LIST.Admin), booksController.createNewBook)
  .patch(verifyRoles(ROLES_LIST.Admin), booksController.updateBook)
  .delete(verifyRoles(ROLES_LIST.Admin), booksController.deleteBook);

module.exports = router;
