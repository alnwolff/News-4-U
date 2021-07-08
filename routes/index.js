const router = require("express").Router();
const User = require('../models/User');
const Article = require("../models/Article");

//auth middleware

const loginCheck = () => {
  return (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/login');
    }
  }
}



/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


router.get('/readlater', loginCheck(), (req, res, next) => {
  User.findById(req.session.user._id)
  .populate('readLater')
  .then(userFromDB => {
    res.render('read-later', {user: userFromDB});
  })
  .catch((err) => {
    next(err);
  })
})

router.get('/readLater/:id/delete', loginCheck(), (req, res, next) => {
  Article.findById(req.params.id)
      .then(articleFromDB =>{
          User.findById(req.session.user._id)
              .then(userFromDB => {
                  const readLater = userFromDB.readLater
                  const i = readLater.indexOf(articleFromDB._id);

                  if (i > -1) {
                  readLater.splice(i, 1);
                  }

                  User.findByIdAndUpdate(userFromDB._id, {readLater})
                      .then(() => {
                          res.redirect('/readLater');
                      })
                      .catch((err) => {
                          next(err);
                      })
              })

              .catch((err) => {
                  next(err);
              })
      })
      .catch((err) => {
          next(err);
      })
});

module.exports = router;
