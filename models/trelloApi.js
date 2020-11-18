const tokenService = require('../service/tokenService');
const request = require('./request');
const url = 'https://trello.com/1';

exports.getLoginUrl = function(){
    return url + '/authorize?expiration=never&name=ultipayProman&scope=read&response_type=token&key=' + process.env.TRELLO_KEY;
}

exports.saveToken = async function(data){
    try {
        let body = {
            employeeId: data.employeeId,
            token: data.token,
            type: 'trello'
        }
        let result = await tokenService.saveToken(body);
        return result;    
    } catch (error) {
        return false
    }
}

exports.getToken = async function(data){
    try {
        let body = {
            employeeId: data.employeeId,
            type: 'trello'
        }
        let result = await tokenService.getToken(body);
        return result;    
    } catch (error) {
        return false;
    }
}

exports.getBoard = async function(data){
    try {
        var options = {
            'method': 'GET',
            'url': url + '/members/me/boards?key=' + process.env.TRELLO_KEY + '&token=' + data.token,
            'headers': {
                'Cookie': 'dsc=469d7c35bd1bf2765b34951b5a26517cd7987f0c923075645d5c495ce820df80'
            }
        };
        let result = await request.sentRequest(options);
        return result;
    } catch (error) {
        return false
    }
}