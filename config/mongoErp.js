require('dotenv').config();
const mongoUrl = `mongodb://${process.env.ERPDB_HOST}:${process.env.ERPDB_PORT}/${process.env.ERPDB_DATABASE}`;
module.exports = {
    mongoDb: {
        url: mongoUrl
    }
};