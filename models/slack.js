var request = require('request');
const url = process.env.SLACK_URL;

exports.sendNotification = async function(data){
    try {
        let response = [];
        // let urls = url.split(",");
        let urls = data.url.split(",");
        let body = {
            "text": data.text
        }
        for(let dataUrl of urls){
            const options = {
                'method': 'POST',
                'url': dataUrl,
                'headers': {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            };
            response.push(await sentRequest(options));
        }
        return response
    } catch (error) {
        console.log("sendNotification::", error);
        return resolve(false);
    }
}

function sentRequest (options){
    console.log("options::", options);
    return new Promise(async function(resolve){
        request(options, function (error, response) {
            if (error) {
                console.log("error::", error);
                return resolve(false);
            }
            console.log("sentRequest::", response.body);
            try {
                return resolve(JSON.parse(response.body))
            } catch (error) {
                return resolve(response.body)   
            }
        });
    })
}