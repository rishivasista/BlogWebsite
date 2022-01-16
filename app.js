const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "The lake or the easy weekend is the desire to want to decorate it. He was always the creator, not the time of his life. Let's be honest, let's just say it's a lot of fun. Cartoon earth dwell in this. Then leave the lion or the hotel with a warm door. Until the vengeful heads of the bow, not the members nor the members. Mattis annoys me from the arrows but he was a diesel guy. The mountains will be born with great gods and a ridiculous mus will miss life's compensation. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. The vengeful life of the author eu augue to drink at the bed of the bow. I hate the memories at any laughter, but I hate the Olympics. Of course there was a lot of annoyance from the arrows at the kids.";
const aboutContent = "This is your personal Daily Journal in which you can write your thoughts as well as write about your daily experience.";
const contactContent = "My name is Rishi Vasista and I am the developer of this site! Feel free to contact me anytime on my email account: vasistarishi@gmail.com";
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb+srv://admin-rishi:Stpaul2013@cluster0.a6fch.mongodb.net/blogsDB")
// mongoose.connect("mongodb://localhost:27017/blogsDB");
const blogSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Blog = mongoose.model("Blog", blogSchema);

app.get("/", (req, res) => {

  Blog.find({}, (err, blogs) => {
    res.render("home", {
      homeStartingContent: homeStartingContent,
      posts: blogs,
    });
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", (req, res) => {

  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const blog = new Blog({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  blog.save((err) => {
    if(!err) {
      res.redirect("/");
    }
  });

});

app.get("/posts/:postId", (req, res) => {
  const requestedPostId = req.params.postId;
  Blog.findOne({
    _id: requestedPostId
  }, (err, blog) => {
    res.render("post", {
      postTitle: blog.title,
      postContent: blog.content
    });
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000!");
});