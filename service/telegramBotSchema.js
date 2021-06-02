'use strict';
var mongoose = require('mongoose').set('debug', true);
const Schema = mongoose.Schema;
const newSchema = new Schema({
    chatId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    extData: {
        type: String,
        required: false
    }
},{
    timestamps: true
});
const newModel = mongoose.model('telegramBot', newSchema);
module.exports = newModel;