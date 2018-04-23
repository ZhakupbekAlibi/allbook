var express = require('express');
var router = express.Router();

var Blog = require("../models/Blog.js");
var User = require("../models/User.js");

router.get('/', function(req, res, next){
  Blog.find().populate('user', 'name').exec(function(err, blogs){
    res.status(200).send(blogs);
  });
});


router.get('/:id', function(req, res, next){
    Blog.find({user: req.params.id}).exec(function(err, blogs){
        User.findById(req.params.id).exec(function(err, user) {
           res.status(200).send({
               blogs: blogs,
               user: user
           });
        });
    });
});



module.exports = router;