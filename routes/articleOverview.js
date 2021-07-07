const router = require("express").Router();
const User = require('../models/User');

// import News API
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('55a7e090588c43a8b6202dcd3c96e2ed');

// var todayTimeStamp = new Date(); 
// var oneDayTimeStamp = 1000 * 60 * 60 * 24; // Milliseconds in a day
// var diff = todayTimeStamp - oneDayTimeStamp;
// var yesterdayDate = new Date(diff);

/* GET articleOverview page */
router.get("/articleoverview", (req, res, next) => {
  newsapi.v2.everything({
    // q: 'bitcoin',
    // to: Date.now(),
    // Add id of sources
    sources:"bbc-news, the-wall-street-journal, google-news, cnn, cbs-news, techcrunch",
    from: "2021-07-05",
    language: 'en',
    sortBy: 'relevancy',
    page: 2
    }).then(articleList => {
    console.log(articleList);
    // console.log(articleList.articles[0]);
    res.render("articleOverview/articleOverview.hbs", {article: articleList.articles});
    });
});




module.exports = router;