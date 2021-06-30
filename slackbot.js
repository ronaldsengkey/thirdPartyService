if (process.env.NODE_ENV !== "production")
{
    require("dotenv").config()
}
const express = require('fastify')
const port = "8220"
const app = express()
const events = require('./config/slackBot');
events.listenForEvents(app)
app.listen(port, function () {
    console.log(`Listening on ${port}`)
})