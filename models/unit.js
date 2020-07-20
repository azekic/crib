const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const unitSchema = new Schema({
    
    unitNumber: {
        type: Number,
        required: true
    },
    building: {
        type: Schema.Types.ObjectId,
        ref: 'Building',
    },
    occupant:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}
);

module.exports = mongoose.model('Unit', unitSchema);