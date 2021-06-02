'use strict';
const utils = require('../utils/writer.js');
const model = require('../models/telegram');
let response = {};

module.exports.sendNotification = async function(req, res){
    console.log("sendNotification::");
    try {
        let body = req.body;   
        console.log("body: ", body);
        let result = await model.sendMessages(body) 
        if (result) {
            response = {
                "responseCode": process.env.SUCCESS_RESPONSE,
                "responseMessage": "success"
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

module.exports.getSubscriber = async function(req, res){
    console.log("getSubscriber::");
    try {
        let body = req.body;   
        console.log("body: ", body);
        let result = await model.getSubscriber(body) 
        if (result) {
            response = {
                "responseCode": process.env.SUCCESS_RESPONSE,
                "responseMessage": "success",
                "data": result
            };    
        } else {
            response = {
                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                "responseMessage": "Something wrong please try again!!"
            };
        }
    } catch (error) {
        console.log("getSubscriber::", error);
        response = {
            "responseCode": process.env.ERRORINTERNAL_RESPONSE,
            "responseMessage": "Something wrong please try again!!"
        };
    }
    utils.writeJson(res, response);
}