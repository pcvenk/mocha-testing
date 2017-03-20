const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    postCount: Number
});

let User = mongoose.model('User', userSchema);

module.exports = User;