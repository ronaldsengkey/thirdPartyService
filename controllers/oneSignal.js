'use strict';
const utils = require('../utils/writer.js');
const oneSignalM = require('../models/oneSignal');
let response = {};

module.exports.postAccount = async function(req, res){
    try {
        let body = req.body;   
        console.log("body: ", body); 
        if (await oneSignalM.savePlayerId(body)) {
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
    } catch (err) {
        console.log(err);
        response = {
            "responseCode": process.env.ERRORINTERNAL_RESPONSE,
            "responseMessage": "Something wrong please try again!!"
        };
    }
    utils.writeJson(res, response);
}

module.exports.sendNotification = async function(req, res){
    console.log("sendNotification::");
    try {
        let body = req.body;   
        console.log("body: ", body); 
        if (await oneSignalM.sendNotification(body)) {
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