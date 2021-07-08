const router = require("express").Router();
const User = require('../models/User');


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('/profile', (req, res, next) => {
  // console.log(req.session.user)
  User.findById(req.session.user._id)
    .populate('readLater')
    .then(userFromDB => {
      res.render('profile', {user : userFromDB});
    })

    .catch((err) => {
      next(err);
    })
})

module.exports = router;
