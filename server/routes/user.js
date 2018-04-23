var express = require("express");
var router = express.Router();

router.get('/', function(req, res, next){
    if(req.user) {
        res.status(200).send(req.user)
    } else {
        res.status(401).send({msg: "Unauthorized"});
    }
})

module.exports = router;