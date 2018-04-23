var express = require('express');
var router = express.Router();

var Blog = require("../models/Blog.js");


router.post('/', function(req, res, next){
    console.log(req.body);
    var a = new Blog({
      title:req.body.title,
      description: req.body.description,
      img: req.body.img,
      user: req.user._id
    });
    a.save(function(err, blog){
      console.log(blog);
      res.status(201).send(blog);
    });
});

router.get('/', function(req, res, next){
  Blog.find({user: req.user._id}).exec(function(err, blogs){
    res.status(200).send(blogs);
  });
});

router.delete('/:id', function(req, res, next) {
  
  Blog.remove({_id: req.params.id}).exec(function(err) {
    if(err) return next(err);
    else res.status(200).end();
  });
  
});



router.put('/', function(req, res, next){
  Blog.findById(req.body._id).exec(function(err, blog){
    blog.title = req.body.title;
    blog.description = req.body.description;
    blog.save(function(err){
      res.status(200).end();
    })
  })
  
});

router.get('/:id', function(req, res, next) {
    Blog.findById(req.params.id).populate('user', 'name').exec(function(err, blog){
      res.status(200).send(blog);
    });
});



module.exports = router;