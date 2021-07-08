const router = require("express").Router();
const Article = require("../models/Article");
const User = require('../models/User');


/* GET home page */

router.get('/profile', (req, res, next) => {
  // console.log(req.session.user)
  User.findById(req.session.user._id)
    .populate('readLater')
    .then(userFromDB => {
      res.render('profile/profile', {user : userFromDB});
    })

    .catch((err) => {
      next(err);
    })
});

router.get('/profile/edit', (req, res, next) => {
    res.render('profile/editProfile');
});

router.get('/profile/readLater/:id/delete', (req, res, next) => {
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
                            res.redirect('/profile');
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

router.post('/profile/edit', (req, res, next) => {
    const {interests} = req.body;

    if (interests === undefined) {
        res.render('profile/editProfile', {message: 'You must select at least one Interest'});
        return;
    }

    User.findByIdAndUpdate(req.session.user._id, {interests}, {new:true})
        .then(userUpdated => {
            console.log(userUpdated);
            res.redirect('/profile');
        })

        .catch((err) => {
            next(err);
        })
})




module.exports = router;

