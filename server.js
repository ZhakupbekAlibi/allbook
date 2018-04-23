var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');
// for auth 
var crypto = require('crypto');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 1 }));
// for auth
app.use(cookieParser());
app.use(session({ secret: 'your secret here',
    cookie: { maxAge: 3000},
	resave:  true,
	saveUninitialized: true,
	key: 'jsessionid',
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(require("./server/routes"));

var server = app.listen(3000, function() {
  console.log('Express server listening on port 3000');
});



