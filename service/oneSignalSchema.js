'use strict';
var mongoose = require('mongoose').set('debug', true);
const Schema = mongoose.Schema;

const oneSignalSchema = new Schema({
  account_id: {
    type: String,
    required: true
  },
  account_name: {
    type: String,
    required: true
  },
  account_category: {
    type: String,
    required: true
  },
  player_id: {
    type: String,
    required: true
  }
},{ 
    timestamps: true 
});
const oneSignal = mongoose.model('oneSignal', oneSignalSchema);
module.exports = oneSignal;