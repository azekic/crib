const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const buildingSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    }
}
);

module.exports = mongoose.model('Building', buildingSchema);