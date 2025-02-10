const mongoose = require('mongoose');

const ArchiveLog = mongoose.model('ArchiveLog', {
    endpoint: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
})

module.exports = ArchiveLog