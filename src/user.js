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
    posts: [postSchema]
});

//keyword function is used instead of the fat arrow function because of the scope of 'this'
userSchema.virtual('postCount').get(function() {
    //this refers to the user
    return this.posts.length
});

let User = mongoose.model('User', userSchema);

module.exports = User;
