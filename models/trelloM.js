
const url = process.env.TRELLO_HOST;
var optionsArr = [];

const request = require('request');

exports.synchronization = function (data) {
  return new Promise(async function (resolve, reject) {
    try {
      data.key = process.env.TRELLO_KEY;
      let result = false;
      if (data.type == 'board') {
        result = await getBoard(data);
        console.log("result::", result);
      }
      else if (data.type == 'member') {
        result = await getMemberBoard(data);
      }
      else if (data.type == 'memberTask') {
        result = await getMemberTask(data);
      }
      else if (data.type == 'memberProfile') {
        result = await getMemberProfile(data);
      }
      else if (data.type == 'list') {
        result = await getList(data);
      }
      else if (data.type == 'card') {
        result = await getCard(data);
      }
      resolve(result)
    } catch (e) {
      console.log('Error checking token => ', e)
      reject(process.env.ERRORINTERNAL_RESPONSE);
    }
  })
}

function getBoard(data){
  return new Promise(async function (resolve, reject) {  
    try {
        var options = {
            'method': 'GET',
            'url': url + '/board/'+data.idboard+'/?key=' + data.key + '&token=' + data.token,
            'headers': {
                'Cookie': 'dsc=469d7c35bd1bf2765b34951b5a26517cd7987f0c923075645d5c495ce820df80'
            }
        };
        request(options, function (error, response) {
          try {
            // console.log('response::', response);
            if (error){
                console.log("error::", error);
                return resolve(false)
            };
            try {
                return resolve(JSON.parse(response.body))
            } catch (error) {
                console.log("error::", error);
                return resolve(response.body);
            }
        } catch (error) {
            console.log("error::", error);
            return resolve(false)
        }
        });
    } catch (error) {
        return false
    }
  })
}

function getMemberBoard(data){
  return new Promise(async function (resolve, reject) {  
    try {
        var options = {
            'method': 'GET',
            'url': url + '/boards/'+data.id+'/memberships?key=' + data.key + '&token=' + data.token,
            'headers': {
                'Cookie': 'dsc=469d7c35bd1bf2765b34951b5a26517cd7987f0c923075645d5c495ce820df80'
            }
        };

        request(options, function (error, response) {
          try {
            // console.log('response::', response);
            if (error){
                console.log("error::", error);
                return resolve(false)
            };
            try {
                return resolve(JSON.parse(response.body))
            } catch (error) {
                console.log("error::", error);
                return resolve(response.body);
            }
        } catch (error) {
            console.log("error::", error);
            return resolve(false)
        }
        });
    } catch (error) {
        return false
    }
  })
}

function getMemberTask(data){
  return new Promise(async function (resolve, reject) {  
    try {
        var options = {
            'method': 'GET',
            'url': url + '/cards/'+data.idTrello+'/members?key=' + data.key + '&token=' + data.token,
            'headers': {
                'Cookie': 'dsc=469d7c35bd1bf2765b34951b5a26517cd7987f0c923075645d5c495ce820df80'
            }
        };
        optionsArr.push(data.idTrello);
        request(options, function (error, response) {
          try {
            // console.log('response::', response);
            if (error){
                console.log("error::", error);
                return resolve(false)
            };
            try {
                return resolve(JSON.parse(response.body))
            } catch (error) {
                console.log("error::", error);
                return resolve(response.body);
            }
        } catch (error) {
            console.log("error::", error);
            return resolve(false)
        }
        });
    } catch (error) {
        return false
    }
  })
}

function getMemberProfile(data){
  return new Promise(async function (resolve, reject) {  
    try {
        var options = {
            'method': 'GET',
            'url': url + '/members/'+data.idMember+'/?key=' + data.key + '&token=' + data.token,
            'headers': {
                'Cookie': 'dsc=469d7c35bd1bf2765b34951b5a26517cd7987f0c923075645d5c495ce820df80'
            }
        };
        // console.log('options =>',options)
        request(options, function (error, response) {
          try {
            // console.log('response::', response);
            if (error){
                console.log("error::", error);
                return resolve(false)
            };
            try {
                return resolve(JSON.parse(response.body))
            } catch (error) {
                console.log("error::", error);
                return resolve(response.body);
            }
        } catch (error) {
            console.log("error::", error);
            return resolve(false)
        }
        });
    } catch (error) {
        return false
    }
  })
}

function getList(data){
  return new Promise(async function (resolve, reject) {  
    try {
        var options = {
            'method': 'GET',
            'url': url + '/board/'+data.idboard+'/lists?key=' + data.key + '&token=' + data.token,
            'headers': {
                'Cookie': 'dsc=469d7c35bd1bf2765b34951b5a26517cd7987f0c923075645d5c495ce820df80'
            }
        };
        request(options, function (error, response) {
          try {
            // console.log('response::', response);
            if (error){
                console.log("error::", error);
                return resolve(false)
            };
            try {
                return resolve(JSON.parse(response.body))
            } catch (error) {
                console.log("error::", error);
                return resolve(response.body);
            }
        } catch (error) {
            console.log("error::", error);
            return resolve(false)
        }
        });
    } catch (error) {
        return false
    }
  })
}

function getCard(data){
  return new Promise(async function (resolve, reject) {  
    try {
      // https://api.trello.com/1/lists/5d959ca76806db20a87cdf2f/cards?key=d7b98dc93f4fc9b845406a4669d38403&token=f0f746f85f2c7d6b641977498b6131fb8decce6455904f16f0bed9d3dcea4d3c
        var options = {
            'method': 'GET',
            'url': url + '/lists/'+data.idList+'/cards?key=' + data.key + '&token=' + data.token,
            'headers': {
                'Cookie': 'dsc=469d7c35bd1bf2765b34951b5a26517cd7987f0c923075645d5c495ce820df80'
            }
        };
        request(options, function (error, response) {
          try {
            // console.log('response::', response);
            if (error){
                console.log("error::", error);
                return resolve(false)
            };
            try {
                return resolve(JSON.parse(response.body))
            } catch (error) {
                console.log("error::", error);
                return resolve(response.body);
            }
        } catch (error) {
            console.log("error::", error);
            return resolve(false)
        }
        });
    } catch (error) {
        return false
    }
  })
}