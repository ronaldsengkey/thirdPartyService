'use strict';
const utils = require('../utils/writer.js');
const trelloApi = require('../models/trelloApi');
const trelloM = require('../models/trelloM');
let response = {};

module.exports.getAuthData = async function getAuthData(req, res){
    try {
        let id = req.swagger.params['employeeId'].value;
        let token = await trelloApi.getToken({employeeId: id})
        if (!token) {
            response = {
                'responseCode': process.env.EXPIRED_TOKEN_RESPONSE,
                'responseMessage': 'success',
                'data': trelloApi.getLoginUrl()
            }    
        }
        else {
            let result = await trelloApi.checkToken(token);
            console.log("result::", result);
            if (result) {
                response = {
                    'responseCode': process.env.SUCCESS_RESPONSE,
                    'responseMessage': 'success',
                    'data': JSON.stringify(result)
                }
            } else {
                response = {
                    'responseCode': process.env.EXPIRED_TOKEN_RESPONSE,
                    'responseMessage': 'success',
                    'data': trelloApi.getLoginUrl()
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
            'responseCode': process.env.EXPIRED_TOKEN_RESPONSE,
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

module.exports.updateBoard = async function updateBoard(req, res){
    try {
        let body = req.body;   
        console.log("body: ", body); 
        let token = await trelloApi.getToken(body);
        if(!token) response = {
            'responseCode': process.env.EXPIRED_TOKEN_RESPONSE,
            'responseMessage': 'unautorize',
        }
        else {
            body.token = token
            let result = await trelloApi.updateBoard(body)
            if (result) {
                response = {
                    'responseCode': process.env.SUCCESS_RESPONSE,
                    'responseMessage': 'success'
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

module.exports.deleteBoard = async function deleteBoard(req, res){
    try {
        let body = req.body;   
        console.log("body: ", body); 
        let token = await trelloApi.getToken(body);
        if(!token) response = {
            'responseCode': process.env.EXPIRED_TOKEN_RESPONSE,
            'responseMessage': 'unautorize',
        }
        else {
            body.token = token
            let result = await trelloApi.deleteBoard(body)
            if (result) {
                response = {
                    'responseCode': process.env.SUCCESS_RESPONSE,
                    'responseMessage': 'success'
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

module.exports.updateList = async function updateList(req, res){
    try {
        let body = req.body;   
        console.log("body: ", body); 
        let token = await trelloApi.getToken(body);
        if(!token) response = {
            'responseCode': process.env.EXPIRED_TOKEN_RESPONSE,
            'responseMessage': 'unautorize',
        }
        else {
            body.token = token
            let result = await trelloApi.updateList(body)
            if (result) {
                response = {
                    'responseCode': process.env.SUCCESS_RESPONSE,
                    'responseMessage': 'success'
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

module.exports.deleteList = async function deleteList(req, res){
    try {
        let body = req.body;   
        console.log("body: ", body); 
        let token = await trelloApi.getToken(body);
        if(!token) response = {
            'responseCode': process.env.EXPIRED_TOKEN_RESPONSE,
            'responseMessage': 'unautorize',
        }
        else {
            body.token = token
            let result = await trelloApi.deleteList(body)
            if (result) {
                response = {
                    'responseCode': process.env.SUCCESS_RESPONSE,
                    'responseMessage': 'success'
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

module.exports.updateCard = async function updateCard(req, res){
    try {
        let body = req.body;   
        console.log("body: ", body); 
        let token = await trelloApi.getToken(body);
        if(!token) response = {
            'responseCode': process.env.EXPIRED_TOKEN_RESPONSE,
            'responseMessage': 'unautorize',
        }
        else {
            body.token = token
            let result = await trelloApi.updateCard(body)
            if (result) {
                response = {
                    'responseCode': process.env.SUCCESS_RESPONSE,
                    'responseMessage': 'success'
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

module.exports.deleteCard = async function deleteCard(req, res){
    try {
        let body = req.body;   
        console.log("body: ", body); 
        let token = await trelloApi.getToken(body);
        if(!token) response = {
            'responseCode': process.env.EXPIRED_TOKEN_RESPONSE,
            'responseMessage': 'unautorize',
        }
        else {
            body.token = token
            let result = await trelloApi.deleteCard(body)
            if (result) {
                response = {
                    'responseCode': process.env.SUCCESS_RESPONSE,
                    'responseMessage': 'success'
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

module.exports.getSync = async function synchronization(req, res){
    try {
        let body = req.swagger.params['params'].value;
        body = JSON.parse(body);
        let token = await trelloApi.getToken(body);
        if(!token) response = {
            'responseCode': process.env.EXPIRED_TOKEN_RESPONSE,
            'responseMessage': 'unautorize',
        }
        else {
            body.token = token;
            console.log("body::", body);
            response = await trelloM.synchronization(body);
        }
    } catch (error) {
        console.log("error::", error);
        response = {
            'responseCode': process.env.ERRORINTERNAL_RESPONSE,
            'responseMessage': 'error',
        }
    }
    console.log("response::", response);
    utils.writeJson(res, response)
}

module.exports.getList = async function getList(req, res){
    try {
        const employeeId = req.swagger.params['employeeId'].value;
        const boardId = req.swagger.params['boardId'].value;
        let body = {
            employeeId: employeeId,
            boardId: boardId
        }
        let token = await trelloApi.getToken(body);
        if(!token) response = {
            'responseCode': process.env.EXPIRED_TOKEN_RESPONSE,
            'responseMessage': 'unautorize',
        }
        else {
            body.token = token
            let result = await trelloApi.getList(body)
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

module.exports.getCard = async function getCard(req, res){
    try {
        const employeeId = req.swagger.params['employeeId'].value;
        const listId = req.swagger.params['listId'].value;
        let body = {
            employeeId: employeeId,
            listId: listId
        }
        let token = await trelloApi.getToken(body);
        if(!token) response = {
            'responseCode': process.env.EXPIRED_TOKEN_RESPONSE,
            'responseMessage': 'unautorize',
        }
        else {
            body.token = token
            let result = await trelloApi.getCard(body)
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