const Book = require("../models/Book");
const asyncHandler = require("express-async-handler");
const { findById } = require("../models/Book");

// @desc Get a book
// @route GET /book
const getBook = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(409).json({ message: "There needs to be a title" });
  }

  const books = await Book.find({ title: title }).lean();

  if (!books?.length) {
    return res.status(400).json({ message: "No books with this title" });
  }

  res.json(books);
});

// @desc Create new book
// @route POST /book
const createNewBook = asyncHandler(async (req, res) => {
  const { title, description, dateOfRelease, writer } = req.body;

  //confirm if things are alright
  if (!title || !description || !dateOfRelease || !writer) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const bookObject = { title, description, dateOfRelease, writer };

  const book = await Book.create(bookObject);

  if (book) {
    //created
    res.status(201).json(`Book ${bookObject.title} created`);
  } else {
    res.status(400).json({ message: "Invalid book data received" });
  }
});

// @desc Update a book
// @route PATCH /book
const updateBook = asyncHandler(async (req, res) => {
  const { id, title, description, dateOfRelease, isAvailable, writer } =
    req.body;

  if (!id) {
    return res.status(400).json("Field of ID is required for updating!");
  }

  const book = findById(id).exec();

  if (!book) {
    return res.status(400).json({ message: "Book not found" });
  }

  if (title) book.title = title;
  if (description) book.description = description;
  if (dateOfRelease) book.dateOfRelease = dateOfRelease;
  if (isAvailable) book.isAvailable = isAvailable;
  if (writer) book.writer = writer;

  const updatedBook = await book.save();

  res.json({ message: `${updatedBook.title} book updated!` });
});

// @desc Delete a book
// @route DELETE /book
const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Book ID Required" });
  }

  const book = await Book.findById(id).exec();

  if (!book) {
    return res.status(400).json({ message: "Book not found" });
  }

  const result = await book.deleteOne();

  const reply = `Book ${result.title} with ID ${result._id}`;

  res.json(reply);
});

module.exports = {
  getBook,
  updateBook,
  createNewBook,
  deleteBook,
};
