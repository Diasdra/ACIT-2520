/*
 Authors: Jennie and Tiras
 Your name and student #: Jennie Wu A01234586
 Your Partner's Name and student #: Tiras Gimpel A01241239
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require("fs");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index", {movies: ["Inception",
                                          "Spiderman",
                                          "The Dark Knight",
                                           "Tenet"]}));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  let formData = req.body;
  let movieList = formData.Movie.split(",")
  res.render("pages/index", { movies: movieList })
});

app.get("/myListQueryString", (req, res) => {
  // Add your implementation here
  res.render("pages/index", { movies: [req.query.movie1, req.query.movie2] })
});

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
  let movieName = req.params.movieName
  let array = fs.readFileSync('movieDescriptions.txt', "utf-8")
  let splitarray = array.split('\n')
  let descList = {}

  for (let i = 0; i < splitarray.length; i++) {
    const element = splitarray[i];
    let temp = element.split(':')
    descList[temp[0]] = temp[1]
  }
  let inList = false

  if(descList[movieName]){
    inList = true
    movieDesc = descList[movieName]
  }

  if(inList){
    res.render("pages/searchResult", {found: true, movie: movieName, desc: movieDesc})
  } else{
    res.render("pages/searchResult", {found: false})
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});