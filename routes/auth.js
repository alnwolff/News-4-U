const router = require("express").Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


router.get('/signup', (req, res, next) => {
    res.render('auth/signup');
})

router.get('/login', (req, res, next) => {
    res.render('auth/login');
})

router.post('/signup', (req, res, next) => {
    const {name, username, password, interests} = req.body;

    if (name.length === 0 || username.length === 0) {
        res.render('auth/signup', {message: 'The Name and Username cannot be empty'});
        return;
    }

    if (password.length < 5) {
        res.render('auth/signup', {message: 'The Password must have at least 5 characters'});
        return;
    }

    if (interests === undefined) {
        res.render('auth/signup', {message: 'You must select at least one Interest'});
        return;
    }

    User.findOne({username: username})
        .then(userFromDB => {
            if (userFromDB !== null) {
                res.render('auth/signup', {message: 'This Username is already taken'});
                return;
            } else {
                const salt= bcrypt.genSaltSync();
                const hash = bcrypt.hashSync(password, salt);
                console.log({hash});

                User.create({name, username, password: hash, interests})
                    .then(createdUser => {
                        console.log(createdUser)
                        res.redirect('/login');
                    })
                    .catch(err => {
                        next(err);
                    })
            }

        })

        .catch(err => {
            next(err);
        })
})

router.post('/login', (req, res, next) => {

	const { username, password } = req.body;
	User.findOne({ username: username })
		.then(userFromDB => {
			if (userFromDB === null) {
				res.render('auth/login', { message: 'Invalid credentials' });
				return;
			}
			if (bcrypt.compareSync(password, userFromDB.password)) {
				req.session.user = userFromDB;
				res.redirect('/articleoverview');
			} else {
				res.render('auth/login', { message: 'Invalid credentials' });
				return;
			}
		})

});

router.get('/logout', (req, res, next) =>{
    req.session.destroy(err => {
        if (err) {
            next(err);
        } else {
            res.redirect('/login');
        }
    })
})


module.exports = router;

