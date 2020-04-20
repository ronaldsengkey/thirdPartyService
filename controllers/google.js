'use strict';
const utils = require('../utils/writer.js');
const request = require('request');
const fs = require('fs'),
    path = require('path');
const googleApi = require('../models/googleApi');
const account = require('../config/account');

module.exports.checkGoogleToken = async function checkGoogleToken(req, res, next){
    var token = req.swagger.params['token'].value;
    let body = JSON.parse(req.swagger.params['param'].value);
    try {
        let ceto = await account.checkToken(token);
        if (ceto.responseCode == process.env.SUCCESS_RESPONSE) {
            //validasi belum
            let oAuth2Client = await googleApi.getAuth2Client(body.employeeId);
            console.log("oAuth2Client: ", oAuth2Client);
            let auth = await googleApi.getAuthorize(body.employeeId, oAuth2Client);
            console.log("auth: ", auth);
            if (!auth) {
                let response = await googleApi.getAccessTokenUrl(oAuth2Client);
                utils.writeJson(res, response);
            }
            else {
                let response = {
                    "responseCode": process.env.SUCCESS_RESPONSE,
                    "responseMessage": "You are connected with google"
                }
                utils.writeJson(res, response);
            }
        } else {
            let response = {
                "responseCode": process.env.UNAUTHORIZED_RESPONSE,
                "responseMessage": "Please login first!"
            };
            utils.writeJson(res, response);
        }
    } catch (err) {
        console.log(err);
        let response = {
            "responseCode": process.env.ERRORINTERNAL_RESPONSE,
            "responseMessage": "Something wrong please try again!!"
        };
        utils.writeJson(res, response);
    }
}

module.exports.createGoogleToken = async function createGoogleToken(req, res, next){
    var token = req.swagger.params['token'].value;
    let body = req.body;
    try {
        let ceto = await account.checkToken(token);
        if (ceto.responseCode == process.env.SUCCESS_RESPONSE) {
            //validasi belum
            let oAuth2Client = await googleApi.getAuth2Client(body.employeeId);
            console.log("oAuth2Client: ", oAuth2Client);
            let a = await googleApi.createGoogleToken(body, oAuth2Client);
            utils.writeJson(res, a);
        } else {
            let response = {
                "responseCode": process.env.UNAUTHORIZED_RESPONSE,
                "responseMessage": "Please login first!"
            };
            utils.writeJson(res, response);
        }
    } catch (err) {
        console.log(err);
        let response = {
            "responseCode": process.env.ERRORINTERNAL_RESPONSE,
            "responseMessage": "Something wrong please try again!!"
        };
        utils.writeJson(res, response);
    }
}
  
module.exports.createGoogleCalendarEvent = async function createGoogleCalendarEvent(req, res, next){
    var token = req.swagger.params['token'].value;
    let body = req.body;
    try {
        let ceto = await account.checkToken(token);
        if (ceto.responseCode == process.env.SUCCESS_RESPONSE) {
            //validasi belum
            let oAuth2Client = await googleApi.getAuth2Client(body.employeeId);
            console.log("oAuth2Client: ", oAuth2Client);
            
            let auth = await googleApi.getAuthorize(body.employeeId, oAuth2Client);
            console.log("auth: ", auth);
            
            let a = await googleApi.insertEvent(body, auth);
            utils.writeJson(res, a);
        } else {
            let response = {
                "responseCode": process.env.UNAUTHORIZED_RESPONSE,
                "responseMessage": "Please login first!"
            };
            utils.writeJson(res, response);
        }
    } catch (err) {
        console.log(err);
        let response = {
            "responseCode": process.env.ERRORINTERNAL_RESPONSE,
            "responseMessage": "Something wrong please try again!!"
        };
        utils.writeJson(res, response);
    }
}
  
module.exports.getGoogleCalendarEvent = async function getGoogleCalendarEvent(req, res, next){
    var token = req.swagger.params['token'].value;
    let body = JSON.parse(req.swagger.params['param'].value);
    try {
      let ceto = await account.checkToken(token);
      if (ceto.responseCode == process.env.SUCCESS_RESPONSE) {
          //validasi belum
          let oAuth2Client = await googleApi.getAuth2Client(body.employeeId);
          console.log("oAuth2Client: ", oAuth2Client);
          
          let auth = await googleApi.getAuthorize(body.employeeId, oAuth2Client);
          console.log("auth: ", auth);
          
          let a = await googleApi.listEvents(body, auth);
          utils.writeJson(res, a);
      } else {
          let response = {
              "responseCode": process.env.UNAUTHORIZED_RESPONSE,
              "responseMessage": "Please login first!"
          };
          utils.writeJson(res, response);
      }
    } catch (err) {
        console.log(err);
        let response = {
            "responseCode": process.env.ERRORINTERNAL_RESPONSE,
            "responseMessage": "Something wrong please try again!!"
        };
        utils.writeJson(res, response);
    }
}

module.exports.getAddressCoordinate = async function getAddressCoordinate(req, res, next){
    var token = req.swagger.params['token'].value;
    let body = JSON.parse(req.swagger.params['param'].value);
    try {
      let ceto = await account.checkToken(token);
      if (ceto.responseCode == process.env.SUCCESS_RESPONSE) {
          //validasi belum          
          let a = await googleApi.getAddressCoordinate(body)
          utils.writeJson(res, a);
      } else {
          let response = {
              "responseCode": process.env.UNAUTHORIZED_RESPONSE,
              "responseMessage": "Please login first!"
          };
          utils.writeJson(res, response);
      }
    } catch (err) {
        console.log(err);
        let response = {
            "responseCode": process.env.ERRORINTERNAL_RESPONSE,
            "responseMessage": "Something wrong please try again!!"
        };
        utils.writeJson(res, response);
    }
}