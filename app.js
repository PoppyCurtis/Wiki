const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikidb", {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", function(req, res) {
    Article.find(function(err, results) {
        if (!err) {
            res.send(results);
        }
        else {
            res.send(err);
        }
    });
});
app.post("/articles", function(req, res) {
    console.log();

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save(function(err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("All OK");
        }
    });
});

app.delete("/articles", function(req, res) {
    Article.deleteMany(function(err, results) {
        if (!err) {
            res.send("Successfully deleted all articles");
        }
        else {
            res.send(err);
        }
    });
});

app.listen(3000, function(req, res) {
    console.log("Server running on Port 3000");
});