const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    images: [ 
        {
            type: String
        }
    ]
},
{timestamps: true}
);

module.exports = mongoose.model('Post', postSchema);