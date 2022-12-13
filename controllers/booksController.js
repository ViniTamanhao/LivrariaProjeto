const Book = require("../models/Book");
const asyncHandler = require("express-async-handler");

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
    res.status(201).json("Book created");
  } else {
    res.status(400).json({ message: "Invalid book data received" });
  }
});
