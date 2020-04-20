'use strict';
var mongoose = require('mongoose').set('debug', true);
const Schema = mongoose.Schema;

/**
 * Requesting access
 * 
 *
 * body Oauth data credential guest
 * no response value expected for this operation
 **/
const messageSchema = new Schema({
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    read: {
        type: String,
        require: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
const message = mongoose.model('message', messageSchema);
module.exports = message;