const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: String,
    name: String,
    password: {
        type: String,
        required: true
    },
    highscore: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('User', UserSchema);
