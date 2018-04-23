var express = require("express");
var router = express.Router();

var Comment = require("../models/Comment.js");

router.post('/', function(req, res, next){
   var comment = new Comment({
       description: req.body.description,
       user: req.user._id,
       blog: req.body.blog
   }) 
   
   comment.save(function(err, comment){
      Comment.findById(comment._id)
          .populate('user', 'name')
          .exec(function(err, comm){
              res.status(201).send(comm); 
          })
      
   });
});


router.get('/:blog_id', function(req, res, next){
   Comment.find({blog: req.params.blog_id})
    .populate('user', 'name')
    .exec(function(err, comments){
        res.status(200).send(comments);
    })
});


router.delete('/:id/:blogUserId/:commentUserId', function(req, res, next){
   if(req.user._id.toString()==req.params.blogUserId ||
   req.user._id.toString()==req.params.commentUserId) {
       Comment.remove({_id: req.params.id}).exec(function(err){
           res.status(200).end();
       })
   } else {
       res.status(400).send({msg: "Permision denied!"});
   }
});



router.put('/', function(req, res, next){
   Comment.findById(req.body._id)
    .exec(function(err, comment){
        comment.description = req.body.description;
        comment.save(function(err){
            res.status(200).end();
        })
    })
});


module.exports = router;