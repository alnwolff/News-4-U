const router = require("express").Router();
const User = require('../models/User');

// import News API
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('55a7e090588c43a8b6202dcd3c96e2ed');

/* GET articleOverview page */
router.get("/articleoverview", (req, res, next) => {
  User.findById(req.session.user._id)
    .then(userFromDB => {

      // console.log(userFromDB.interests);
      newsapi.v2.everything({
        q: "music OR football OR finance",
        // sources:"bbc-news, the-wall-street-journal, google-news, cnn, cbs-news, techcrunch",
        from: '2021-07-04',
        language: 'en',
        sortBy: 'relevancy',
        page: 1
        })
          .then(articleList => {
          // Article.create
          console.log("this is the console log");
          console.log(articleList);
          res.render("articleOverview/articleOverview.hbs", {article: articleList.articles});
          });
    })

    .catch((err) => {
      next(err);
    })
});

router.post('/articleoverview', (req, res, next) => {
  console.log(req.body)
})



module.exports = router;