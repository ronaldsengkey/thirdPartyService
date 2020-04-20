const pg = require('pg');
const connection = `postgres://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOSTNAME}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
console.log('DATABASE URL = ' + connection);
const pgCon = new pg.Client(connection);
pgCon.connect(function(err,client) {
    if (!err) {
        console.log('pg connected');
    } else {
        console.log(err.detail);
    }
});
module.exports = pgCon;