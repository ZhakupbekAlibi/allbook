var mongoose = require('mongoose');

// Like schema
var likeSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    user: {type: mongoose.Schema.ObjectId, ref: 'User' },
    blog: {type: mongoose.Schema.ObjectId, ref: 'Blog' }
});

module.exports = mongoose.model('Like', likeSchema);
