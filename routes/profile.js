const router = require("express").Router();
const Article = require("../models/Article");
const User = require('../models/User');
const { uploader, cloudinary } = require('../config/cloudinary');

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

router.get('/profile', loginCheck(), (req, res, next) => {
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

router.get('/profile/edit', loginCheck(), (req, res, next) => {
    User.findById(req.session.user._id)
        .then(userFromDB => {
            // console.log(userFromDB)
            res.render('profile/editProfile', {user: userFromDB});
        })

        .catch((err) => {
            next(err);
        })
});

router.get('/profile/readLater/:id/delete', loginCheck(), (req, res, next) => {
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

router.post('/profile/edit', uploader.single('profile-pic'), (req, res, next) => {
    const {name, interests} = req.body;

    User.findById(req.session.user._id)
        .then(userFromDB => {
            let imgPath = userFromDB.imgPath;
            let imgName = userFromDB.imgName;
            let publicId = userFromDB.publicId;

            if (interests === undefined) {
                res.render('profile/editProfile', {user: userFromDB, message: 'You must select at least one Interest'});
                return;
            }

            if (name.length === 0) {
                res.render('profile/editProfile', {user: userFromDB, message: 'The Name cannot be empty'});
                return;
            }
            
            if (req.file) {
                imgPath = req.file.path;
                imgName = req.file.originalname;
                publicId = req.file.filename;
            }
            
            User.findByIdAndUpdate(req.session.user._id, {name, interests, imgPath, imgName, publicId})
                .then(userUpdated => {
                    console.log(userUpdated);
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




module.exports = router;

