const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});

});

// Get the book list available in the shop using Callbacks
//Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
let getBookList = new Promise((resolve,reject) => {
  setTimeout(() => {
    const booksList = JSON.stringify(books,null,4);
    resolve(booksList);
  },6000)})

//Console log before calling the promise
console.log("Waiting to fetch list of books...");

//Call the promise and wait for it to be resolved, and then print a message.
getBookList.then((successMessage) => {
  console.log("Fetching list of books..." + successMessage);

//Console log after calling the promise
console.log("List of books fetched successfully!");

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn])
  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  res.send(books[author])
 
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  res.send(books[title])

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const reviews = req.params.reviews;
  res.send(books[reviews])
  
});

module.exports.general = public_users;
