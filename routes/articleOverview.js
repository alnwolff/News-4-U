const router = require("express").Router();
const User = require('../models/User');
const Article = require('../models/Article');


// import News API
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('5c5f9c0ec00c4cc08ce9d5c4ea66b8b6');

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
        // sources:"bbc-news, the-wall-street-journal, google-news, cnn, cbs-news, techcrunch",
        from: "2021-07-05",
        language: 'en',
        sortBy: 'relevancy',
        page: 1
        }).then(articleList => {
          console.log(articleList);

          res.render("articleOverview/articleOverview.hbs", {article: articleList.articles});
          });
    })

    .catch((err) => {
      next(err);
    })
});

router.post('/articleoverview', (req, res, next) => {
  console.log(req.body);
  const {source, author, title, description, url, urlToImage, publishedAt, content} = req.body;
  Article.create({source, author, title, description, url, urlToImage, publishedAt, content})
    .then(articleCreated => {
      User.findById(req.session.user._id)
        .then(userFromDB => {
          // console.log(userFromDB.readLater)
          const readLater = userFromDB.readLater
          readLater.push(articleCreated._id);
          console.log(readLater);

          User.findByIdAndUpdate(userFromDB._id, {readLater: readLater})
            .then(userUpdated => {
              console.log(userUpdated);
            })

            .catch((err)=> {
              next(err);
            })
        })
    })

    .catch((err) => {
      next(err);
    })
})



module.exports = router;