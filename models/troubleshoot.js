const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const troublehsootShema = new Schema({

    amenity: {
        type: Schema.Types.ObjectId,
        ref: 'Amenity'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Troubleshoot', troubleshootSchema);