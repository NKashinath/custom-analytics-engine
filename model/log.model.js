const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Log = mongoose.model('Log', {
    endpoint: {
        type: String,
        index: true
    },
    method: {
        type: String,
        enum: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    },
    userId: {
        type: String,
        index: true,
        default: uuidv4
    },
    timestamp: {
        type: Date,
        default: Date.now,
        index: -1
    },
})
module.exports = Log;