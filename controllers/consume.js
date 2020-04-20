'use strict';

var utils = require('../utils/writer.js');
var consumer = require('../service/consumer');

module.exports.consumeMessage = async function consumeMessage (req, res, next) {
  // let data = req.body;
  let param = req.swagger.params['param'].value;
  let signature = req.swagger.params['signature'].value;
  // let token = req.swagger.params['token'].value;
try{
  let a = await consumer.consumeMessage(param);
  utils.writeJson(res, a);
}catch(err){
  response = {
    responseCode:process.env.ERRORINTERNAL_RESPONSE,
    responseMessage:"Internal server error, please try again!",
    error:err
  }
  utils.writeJson(res, response);
}

};
