'use strict';
const utils = require('../utils/writer.js');
const trelloApi = require('../models/trelloApi');
let response = {};

module.exports.getAuthData = async function getAuthData(req, res){
    try {
        response = {
            'responseCode': process.env.SUCCESS_RESPONSE,
            'responseMessage': 'success',
            'data': trelloApi.getLoginUrl()
        }
    } catch (error) {
        console.log("error::", error);
        response = {
            'responseCode': process.env.ERRORINTERNAL_RESPONSE,
            'responseMessage': 'error',
        }
    }
    utils.writeJson(res, response);
}

module.exports.postAuthData = async function postAuthData(req, res, next){
    try {
        let body = req.body;   
        console.log("body: ", body); 
        if (await trelloApi.saveToken(body)) {
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

module.exports.getBoard = async function getBoard(req, res){
    try {
        const employeeId = req.swagger.params['employeeId'].value;
        let body = {
            employeeId: employeeId
        }
        let token = await trelloApi.getToken(body);
        if(!token) response = {
            'responseCode': process.env.UNAUTHORIZED_RESPONSE,
            'responseMessage': 'unautorize',
        }
        else {
            body.token = token
            let result = await trelloApi.getBoard(body)
            if (result) {
                response = {
                    'responseCode': process.env.SUCCESS_RESPONSE,
                    'responseMessage': 'success',
                    'data': result
                }
            } else {
                response = {
                    'responseCode': process.env.ERRORINTERNAL_RESPONSE,
                    'responseMessage': 'error',
                }
            }
        }
    } catch (error) {
        console.log("error::", error);
        response = {
            'responseCode': process.env.ERRORINTERNAL_RESPONSE,
            'responseMessage': 'error',
        }
    }
    utils.writeJson(res, response);
}