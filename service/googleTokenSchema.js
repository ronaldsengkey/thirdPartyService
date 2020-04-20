'use strict';
var mongoose = require('mongoose').set('debug', true);
const Schema = mongoose.Schema;
const googleTokenSchema = new Schema({
  employeeId: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});
const googleToken = mongoose.model('googleToken', googleTokenSchema);
module.exports = googleToken;