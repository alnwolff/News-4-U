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
  User.findById(req.session.user._id)
    .then(userFromDB => {

      function addOperator(array) {
        let interests = ''
        for(let i = 0; i < array.length ; i ++) {
         if (i < array.length -1) {
           interests += array[i] + ' OR '
         } else {
           interests += array[i]
         }
        }
        return (interests)
      }
      console.log(addOperator(userFromDB.interests));

      newsapi.v2.everything({
        q: addOperator(userFromDB.interests),
        // to: Date.now(),
        // Add id of sources
        sources:"bbc-news, the-wall-street-journal, google-news, cnn, cbs-news, techcrunch",
        from: "2021-07-05",
        language: 'en',
        sortBy: 'relevancy',
        page: 2
        }).then(articleList => {
        console.log(articleList);
        res.render("articleOverview/articleOverview.hbs", {article: articleList.articles});
        });
    })

    .catch((err) => {
      next(err);
    })
});




module.exports = router;