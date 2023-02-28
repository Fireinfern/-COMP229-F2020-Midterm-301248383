// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/details', {title: 'Add Book', books: {Title: "", Price: 0, Author: "", Genre: ""}})
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', async (req, res, next) => {
  console.log(req.body);
  let newBook = new book(req.body);
  await newBook.save();
  res.redirect("/books");
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  book.findById(req.params.id, (err, foundBook) => {
    if (err) {
      return console.error(err);
    }
    res.render("books/details", {books: foundBook, title: 'Update Book'})
  });
  
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  book.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
    if (err) return console.error(err);
    res.redirect("/books");
  })
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
    book.findByIdAndDelete(req.params.id, (err, doc) => {
      if (err) return console.error(err);
      res.redirect("/books");
    });
});


module.exports = router;
