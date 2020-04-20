const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  database: {
    engine: process.env.DATABASE_ENGINE,
    hostname: process.env.DATABASE_HOSTNAME,
    port: process.env.DATABASE_PORT,
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
  },
  awsDatabase: {
    engine: process.env.AWS_DATABASE_ENGINE,
    hostname: process.env.AWS_DATABASE_HOSTNAME,
    port: process.env.AWS_DATABASE_PORT,
    name: process.env.AWS_DATABASE_NAME,
    username: process.env.AWS_DATABASE_USERNAME,
    password: process.env.AWS_DATABASE_PASSWORD
  },
  mongo: {
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT,
    database: process.env.MONGODB_DATABASE,
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
  },
  aws_mongo: {
    host: process.env.AWS_MONGODB_HOST,
    port: process.env.AWS_MONGODB_PORT,
    database: process.env.AWS_MONGODB_DATABASE,
    username: process.env.AWS_MONGODB_USERNAME,
    password: process.env.AWS_MONGODB_PASSWORD,
  },
  nexmo: {
    api_key: process.env.NEXMO_API_KEY,
    api_secret: process.env.NEXMO_API_SECRET
  },
  gmail: {
    oauth_client_id: process.env.GMAIL_OAUTH_CLIENT_ID,
    oauth_client_secret: process.env.GMAIL_OAUTH_CLIENT_SECRET,
    oauth_url_redirect: process.env.GMAIL_OAUTH_URL_REDIRECT,
    oauth_refresh_token: process.env.GMAIL_OAUTH_REFRESH_TOKEN
  }
};