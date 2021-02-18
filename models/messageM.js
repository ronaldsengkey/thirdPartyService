var mongoose = require('mongoose').set('debug', true);
var mongoConf = require('../config/mongo');
var schema = require('../service/message');
const request = require('request');
const pgCon = require('../config/pgConfig');

async function getMessage (id) {
    try {
        let queryParams = {
            $or: [{
                    'senderId': id
                },
                {
                    'receiverId': id
                }
            ]
        };
        mongoose.Promise = global.Promise;
        // await mongoose.connect(mongoConf.mongoDb.url);
        var query = await schema.find(queryParams).sort({
            'created_at': 1
        })
        if (query === null) {
            return process.env.NOTFOUND_RESPONSE;
        } else {
            console.log("getMessage: ", query)
            return query;
        }
    } catch (error) {
        console.log("getMessage: ", err);
    }
}

async function findMessage (data) {
    try {
        let queryParams = {
            $or: [{
                    'senderId': data.id,
                    'receiverId': data.partnerId
                },
                {
                    'senderId': data.partnerId,
                    'receiverId': data.id
                }
            ]
        };
        mongoose.Promise = global.Promise;
        // await mongoose.connect(mongoConf.mongoDb.url);
        var query = await schema.find(queryParams).sort({
            'created_at': 1
        })
        if (query === null) {
            return process.env.NOTFOUND_RESPONSE;
        } else {
            console.log("GET NOTIF SUCCESS ", query)
            return query;
        }
    } catch (error) {
        console.log("error get findMessage: ", error);
        
    }
}

async function findOneMessage (id) {
    try {
        let queryParams = {
            "_id": id
        };
        mongoose.Promise = global.Promise;
        // await mongoose.connect(mongoConf.mongoDb.url);
        var query = await schema.find(queryParams).sort({
            'created_at': 1
        })
        if (query === null) {
            return process.env.NOTFOUND_RESPONSE;
        } else {
            console.log("GET NOTIF SUCCESS ", query)
            return query;
        }
    } catch (error) {
        console.log("error findOneMessage: ", error);
        
    }
}

async function createMessage (data) {
    try {
        // await mongoose.connect(mongoConf.mongoDb.url);
        var message = new schema({
            senderId: data.senderId,
            receiverId: data.receiverId,
            message: data.message,
            status: data.status,
            type: data.type,
            read: data.read,
        });

        await message.save();
        // await saveStatus.set('transactionCode',Buffer.from("O:"+saveStatus._id).toString('base64'));
        // await saveStatus.save();
        return message;
    } catch (err) {
        console.log("createMessage: ", err);
    }
}

async function updateMessage (data) {
    try {
        var result = await schema.findOneAndUpdate(data.param, {
            $set: data.data
        }, {
            useFindAndModify: false
        });
        if (result === null) {
            return(process.env.NOTFOUND_RESPONSE);
        } else {
            return(process.env.SUCCESS_RESPONSE);
        }
    } catch (error) {
        console.log(error)
        return process.env.ERRORINTERNAL_RESPONSE;
    }
}

exports.create = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            console.log('CREATE MESSAGE DATA => ', data)
            let res = await createMessage(data);
            if (res != process.env.NOTFOUND_RESPONSE) {
                console.log('Success create message');
                message = {
                    "responseCode": process.env.SUCCESS_RESPONSE,
                    "responseMessage": "Success create message!",
                    "data": res._id,
                }
                resolve(message);
            } else {
                console.log('Failed create message');
                message = {
                    "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                    "responseMessage": "Failed create message!"
                }
                resolve(message);
            }
        } catch (err) {
            console.log('Error create message ', err)
            message = {
                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                "responseMessage": "Internal server error. Please try again later!"
            }
            resolve(message);
        }
    })
}

exports.find = function (id) {
    return new Promise (async function (resolve, reject) {
        try {
            console.log('GET MESSAGE DATA => ', id)
            let res = await findOneMessage(id);
            if (res != process.env.ERRORINTERNAL_RESPONSE) {
                console.log('Success get message');
                message = {
                    "responseCode": process.env.SUCCESS_RESPONSE,
                    "responseMessage": "Success get message!",
                    "data": res
                }
                resolve(message);
            } else {
                console.log('Failed get message');
                message = {
                    "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                    "responseMessage": "Failed get message!"
                }
                resolve(message);
            }
        } catch (error) {
            console.log('Error get message ', err)
            message = {
                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                "responseMessage": "Internal server error. Please try again later!"
            }
            resolve(message);
        }
    })
}

exports.get = function (data) {
    return new Promise (async function (resolve, reject) {
        try {
            console.log('GET MESSAGE DATA => ', data)
            let res = await findMessage(data);
            if (res != process.env.ERRORINTERNAL_RESPONSE) {
                console.log('Success get message');
                message = {
                    "responseCode": process.env.SUCCESS_RESPONSE,
                    "responseMessage": "Success get message!",
                    "data": res
                }
                resolve(message);
            } else {
                console.log('Failed get message');
                message = {
                    "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                    "responseMessage": "Failed get message!"
                }
                resolve(message);
            }
        } catch (error) {
            console.log('Error get message ', err)
            message = {
                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                "responseMessage": "Internal server error. Please try again later!"
            }
            resolve(message);
        }
    })
}

exports.show = function (id) {
    return new Promise(async function (resolve, reject) {
        try {
            console.log('GET MESSAGE DATA => ', id)
            let res = await getMessage(id);
            if (res != process.env.ERRORINTERNAL_RESPONSE) {
                console.log('Success get message');
                message = {
                    "responseCode": process.env.SUCCESS_RESPONSE,
                    "responseMessage": "Success get message!",
                    "data": res
                }
                resolve(message);
            } else {
                console.log('Failed get message');
                message = {
                    "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                    "responseMessage": "Failed get message!"
                }
                resolve(message);
            }
        } catch (err) {
            console.log('Error get message ', err)
            message = {
                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                "responseMessage": "Internal server error. Please try again later!"
            }
            resolve(message);
        }
    })
}

exports.update = function (data) {
    return new Promise (async function (resolve, reject) {
        try {
            console.log('UPDATE MESSAGE DATA => ', data)
            let res = await updateMessage(data);
            if (res != process.env.ERRORINTERNAL_RESPONSE) {
                console.log('Success update message');
                message = {
                    "responseCode": process.env.SUCCESS_RESPONSE,
                    "responseMessage": "Success update message!",
                }
                resolve(message);
            } else {
                console.log('Failed update message');
                message = {
                    "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                    "responseMessage": "Failed update message!"
                }
                resolve(message);
            }
        } catch (error) {
            console.log('Error update message ', error)
            message = {
                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                "responseMessage": "Internal server error. Please try again later!"
            }
            resolve(message);
        }
    })
}