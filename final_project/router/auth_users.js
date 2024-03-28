const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validusers = users.filter((user)=>{
  return (user.username === username && user.password === password)
});
if(validusers.length > 0){
  return true;
} else {
  return false;
}

}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const reviews = req.params.reviews;
  let review = books[reviews]
  if (review) { //Check if reviewexists
      let author = req.body.author;
      let title = req.body.title; 
      let reviews = req.body.reviews;   

            //if the author has been changed, update the review??
            if(author) {
              review["author"] = author
          }
            //Add similarly for title
            if(title) {
              review["title"] = title
            }
            //Add similarly reviews
            if(reviews) {
              review["reviews"] = reviews
            }
      
            books[reviews]=reviews;
            res.send(`Review with name  ${reviews} was updated.`);
          }
        else{
        res.send("Unable to find review!");

  }

});

// DELETE a booking under review: Delete a friend by email id
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const reviews = req.params.reviews;
    if (reviews){
        delete books[reviews]
    }
    res.send(`Review of book  ${title} was deleted.`);


  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
