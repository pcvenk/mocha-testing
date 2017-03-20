const mongoose = require('mongoose');
const postSchema  = require('./postSchema');

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters'
        },
        required: [true, 'Name is required']
    },
    postCount: Number,
    posts: [postSchema]
});

let User = mongoose.model('User', userSchema);

module.exports = User;
