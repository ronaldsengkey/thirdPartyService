const schema = require('./extraTokenSchema');

exports.saveToken = async function (data){
    try {
        let query = {
            employeeId: data.employeeId,
            type: data.type,
        }
        let update = {
            token: data.token,
        };
        let option = {
            upsert: true, 
            new: true, 
            setDefaultsOnInsert: true
        }
        let result = await schema.findOneAndUpdate(query, update, option);
        if (result === null) {
            return false;
        } else {
            console.log("getToken: ", result)
            return result;
        } 
    } catch (error) {
        console.log("error::", error);
        return false;
    }
}

exports.getToken = async function (data) {
    try {
        var query = await schema.findOne(data);
        if (query === null) {
            return false;
        } else {
            console.log("getToken: ", query)
            return query.token;
        }
    } catch (error) {
        console.log("getToken: ", error);
        return false
    }
}