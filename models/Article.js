const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

// Taken from the response objects
const articleSchema = new Schema({
    source: Object,
    author: String,
    title: String,
    description: String,
    url: String,
    // in case useful
    urlToImage: String,
    publishedAt: String,
    content: String,
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;