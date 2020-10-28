const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportedIssueSchema = new Schema({

    resolved: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    troubleshoot: {
        type: Schema.Types.ObjectId,
        ref: 'Troubleshoot'
    },
    unit: {
        type: Schema.Types.ObjectId,
        ref: 'Unit'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    photo: {
        type: String,
        required: true
    }
},
{timestamps: true}
);

module.exports = mongoose.model('ReportedIssue', reportedIssueSchema);