var mongoose = require('mongoose');

// Comment schema
var commentSchema = new mongoose.Schema({
    description: String,
    date: { type: Date, default: Date.now },
    user: {type: mongoose.Schema.ObjectId, ref: 'User' },
    blog: {type: mongoose.Schema.ObjectId, ref: 'Blog' }
});

module.exports = mongoose.model('Comment', commentSchema);
