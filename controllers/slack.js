'use strict';
const utils = require('../utils/writer.js');
const model = require('../models/slack');
let response = {};

module.exports.sendNotification = async function(req, res){
    console.log("sendNotification::");
    try {
        let body = req.body;   
        console.log("body: ", body);
        let result = await model.sendNotification(body) 
        if (result) {
            response = {
                "responseCode": process.env.SUCCESS_RESPONSE,
                "responseMessage": "success",
                data: result
            };    
        } else {
            response = {
                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                "responseMessage": "Something wrong please try again!!"
            };
        }
    } catch (error) {
        console.log("sendNotification::", error);
        response = {
            "responseCode": process.env.ERRORINTERNAL_RESPONSE,
            "responseMessage": "Something wrong please try again!!"
        };
    }
    utils.writeJson(res, response);
}