const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    aadharNumber: {
        type: Number,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    mobileNo: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ["voter","admin"]
    },
    isVoted: {
        type: Boolean,
        default: false
    }

})


const User = mongoose.model('User',UserSchema);

module.exports = User;