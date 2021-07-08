const router = require("express").Router();
const User = require('../models/User');


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


router.get('/readlater', (req, res, next) => {
  User.findById(req.session.user._id)
  .populate('readLater')
  .then(userFromDB => {
    res.render('read-later', {user: userFromDB});
  })
  .catch((err) => {
    next(err);
  })
})

module.exports = router;
