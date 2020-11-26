var request = require('request');

exports.sentRequest = function(options){
    return new Promise(async function(resolve){
        request(options, function (error, response) {
            try {
                console.log('response::', response);
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
    });
}
