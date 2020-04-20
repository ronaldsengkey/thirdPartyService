'use strict';

var utils = require('../utils/writer.js');
var producer = require('../service/producer');

module.exports.produceMessage = function produceMessage (req, res, next) {
  let data = req.body;
  let param = req.swagger.params['param'].value;
  let signature = req.swagger.params['signature'].value;
  // let token = req.swagger.params['token'].value;

  data.param = param;
  data.signature = signature;
  // data.token = token;

  producer.produceMessage(data)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
