//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

// **************************** REST METHODS FOR 'articles' START **************************** //

app.route("/articles")

.get((req, res) => {
  console.log("Request GET : /articles");

  Article.find(function(err, foundArticles){
    if(!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }

  });
})

.post((req, res) => {
  console.log("Request POST : /articles");
  console.log("Request body: { \ntitle: " + req.body.title + ",\ncontent: " + req.body.content + "\n}");

  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save((err) => {
    if(!err) {
      res.send("Successfully added new article!!");
    } else {
      res.send(err);
    }
  });
})

.delete((req, res) => {
  console.log("Request DELETE : /articles");

  Article.deleteMany((err) => {
    if (!err) {
      res.send("Successfully deleted all the articles!!");
    } else {
      res.send(err);
    }
  });
});

// **************************** REST METHODS FOR 'articles' END **************************** //

// **************************** REST METHODS FOR 'specific article' START **************************** //

app.route("/articles/:title")

.get((req, res) => {
  console.log("Request GET : /articles/" + req.params.title);

  const articleTitle = req.params.title;
  Article.findOne({title: articleTitle}, (err, articleFound) => {
    if (articleFound) {
      res.send(articleFound);
    } else {
      res.send("No articles found matching title: "+ articleTitle);
      if (err) {
        console.log(err);
      }
    }
  })
})

.put((req, res) => {
  console.log("Request PUT : /articles/" + req.params.title);
  console.log("Request body: { \ntitle: " + req.body.title + ",\ncontent: " + req.body.content + "\n}");

  Article.update({
      title: req.params.title
    }, {
      title: req.body.title,
      content: req.body.content
    }, {
      overwrite: true
    }, (err) => {
      if (!err) {
        res.send("Successfully update the article!!");
      } else {
        res.send(err);
      }
    });
})

.patch((req, res) => {
  console.log("Request PATCH : /articles/" + req.params.title);
  console.log("Request body: { \ntitle: " + req.body.title + ",\ncontent: " + req.body.content + "\n}");

  Article.update({
      title: req.params.title
    }, {
      $set : req.body
    }, (err) => {
      if (!err) {
        res.send("Successfully update the article!!");
      } else {
        res.send(err);
      }
    });
})

.delete((req, res) => {
    console.log("Request PATCH : /articles/" + req.params.title);

    Article.deleteOne({
      title: req.params.title
    }, (err) => {
      if (!err) {
        res.send("Successfully deleted the article having title: " + req.params.title);
      } else {
        res.send(err);
      }
    });
});


// **************************** REST METHODS FOR 'specific article' END **************************** //

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
