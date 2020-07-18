const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        required: true,
        default: 0
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
{timestamps: true}
);

module.exports = mongoose.model('Post', postSchema);