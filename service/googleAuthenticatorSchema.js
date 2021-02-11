'use strict';
var mongoose = require('mongoose').set('debug', true);
const Schema = mongoose.Schema;
const googleAuthenticatorSchema = new Schema({
  accountId: {
    type: String,
    required: true
  },
  accountCategory: {
    type: String,
    required: true
  },
  secret: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});
const googleAuthenticator = mongoose.model('googleAuthenticator', googleAuthenticatorSchema);
module.exports = googleAuthenticator;