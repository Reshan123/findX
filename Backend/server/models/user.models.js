const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    user_name: {
        type: String,
        unique : true,
        required: true
    },

    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    contact_no: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true,
        enum: ['admin', 'user']
    },
    suspended: {
        type: Boolean,
        default: false,
    },

   

 
});

module.exports = mongoose.model('user', UserSchema);