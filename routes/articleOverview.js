const router = require("express").Router();

// import News API
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('55a7e090588c43a8b6202dcd3c96e2ed');

/* GET articleOverview page */
router.get("/articleoverview", (req, res, next) => {
  newsapi.v2.everything({
    q: 'bitcoin',
    sources: 'bbc-news,the-verge',
    domains: 'bbc.co.uk, techcrunch.com',
    language: 'en',
    sortBy: 'relevancy',
    page: 2
    }).then(articleList => {
    console.log("this is the console log");
    // console.log(articleList.articles[0]);
    res.render("articleOverview/articleOverview.hbs", {article: articleList.articles});
    });
});






module.exports = router;