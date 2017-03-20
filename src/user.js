const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters'
        },
        required: [true, 'Name is required']
    },
    postCount: Number
});

let User = mongoose.model('User', userSchema);

module.exports = User;