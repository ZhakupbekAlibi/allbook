var mongoose = require('mongoose');

// Blog schema
var blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: { type: Date, default: Date.now },
    img: String,
    user: {type: mongoose.Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Blog', blogSchema);
