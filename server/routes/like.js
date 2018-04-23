var express = require('express');
var router = express.Router();

var Like = require("../models/Like.js");

router.get('/:id', function(req, res, next){
   Like.count({blog: req.params.id}).exec(function(err, qwerjdfhdsfgjkhdsfgjdsfhjklghdsfjkghdfklsjghl){
       res.status(200).send({likes: qwerjdfhdsfgjkhdsfgjdsfhjklghdsfjkghdfklsjghl })
   }) 
});


router.post('/', function(req, res, next){
    Like.findOne({user: req.user._id, blog: req.body.blog})
        .exec(function(err, like){
             if(like) {
                 Like.remove({_id: like._id})
                    .exec(function(err){
                       res.status(200).send({dislike: true});
                    });
             } else {
                 var newlike = new Like({
                     blog: req.body.blog,
                     user: req.user._id
                 });
                 newlike.save(function(err){
                    res.status(200).send({dislike: false}); 
                 });
             }
             
        });
});


module.exports = router;