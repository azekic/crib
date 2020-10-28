const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const amenitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    troubleshoots: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Troubleshoot'
        }
    ]
}
);

module.exports = mongoose.model('Amenity', amenitySchema);