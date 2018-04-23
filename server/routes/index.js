var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require("../models/User.js");


router.use(passport.initialize());
router.use(passport.session());

// Use of Passport user after login

// router.use(function(req, res, next) {
//     if (req.user) {
//         res.cookie('user', JSON.stringify(req.user));
//     }
//     next();
// });



// Passport local

passport.use(new LocalStrategy({ usernameField: 'email' },
    function( email, password, done) {
        console.log("login", email, password);
        User.findOne({ email: email }).exec(function(err, user) {
            if (err) return done(err);
            if (!user) return done(null, false);
            user.comparePassword(password, function(err, isMatch) {
                if (err) return done(err);
                if (isMatch) return done(null, user);
                return done(null, false);
            });
        });
}));

passport.serializeUser(function(user, done) {
    console.log("serializeUser", user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id).exec(function(err, user) {
        console.log("deserializeUser", user);
        done(err, user);
    });
});


router.post('/api/signup', function(req, res, next){
   
   new User({
       name: req.body.name,
       lastname: req.body.lastname,
       email: req.body.email,
       password: req.body.password
   }).save(function(err, user){
       req.login(user, function(err) {
            if (err)  return next(err);
            return res.json(user);
        });
   });
});

router.post('/api/login', passport.authenticate('local'), function(req, res, next) {
    // res.cookie('user', JSON.stringify(req.user));
    res.send(req.user);
});


router.post('/api/logout', function(req, res, next) {
    req.logout();
    res.status(200).end();
});




router.use('/api/blogs', require("./blog.js"));
router.use('/blogs', require("./blogpublic.js"));
router.use('/api/comments', require("./comment.js"));
router.use('/api/user', require("./user.js"));
router.use('/api/likes', require("./like.js"));

router.get('*', function(req, res, next) {
  res.redirect('/#' + req.originalUrl);
});


module.exports = router;