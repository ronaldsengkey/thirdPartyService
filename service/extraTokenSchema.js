'use strict';
var mongoose = require('mongoose').set('debug', true);
const Schema = mongoose.Schema;
const extraTokenSchema = new Schema({
  employeeId: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});
const dataSchema = mongoose.model('extraToken', extraTokenSchema);
module.exports = dataSchema;