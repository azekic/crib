const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdPosts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    unit: {
        type: Schema.Types.ObjectId,
        ref: 'Unit'
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);