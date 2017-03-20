const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: String,
    postCount: Number
});

let User = mongoose.model('User', userSchema);

module.exports = User;