const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registered. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books},null,4)))
    });
    get_books.then(console.log("Task 10 completed"))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  let get_books_isbn = new Promise((resolve, reject) => {
      resolve(res.send(books[isbn]))
  });
  get_books_isbn.then(console.log("Task 11 completed"))
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let bookKeys = Object.keys(books);
  let get_books_author = new Promise((resolve, reject) => {
    for (key in bookKeys) {
        if (parseInt(key) === 0) {
            continue;
        };
        let book = books[parseInt(key)]
        if (book["author"] === author) {
            resolve(res.send(book))
        };
    };
  });
  get_books_author.then(console.log("Task 12 completed"))
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let bookKeys = Object.keys(books);
    let get_books_title = new Promise((resolve, reject) => {
        for (key in bookKeys) {
            if (parseInt(key) === 0) {
                continue;
            };
            let book = books[parseInt(key)]
            if (book["title"] === title) {
                resolve(res.send(book))
            };
        };
    });
    get_books_title.then(console.log("Task 13 completed"))
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn])
});

module.exports.general = public_users;
