const { createEventAdapter } = require('@slack/events-api')
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET
const slackEvents = createEventAdapter(slackSigningSecret)
const { WebClient } = require('@slack/web-api')
const token = process.env.SLACK_BOT_TOKEN
const web = new WebClient(token)
const helpdeskSchema = require('../service/helpdeskSchema');

function listenForEvents(app) {
    app.use('/', slackEvents.requestListener())

    slackEvents.on('app_mention', (event) => {
        console.log("app_mention::", event);
        console.log(`Received an app_mention event from user ${event.user} in channel ${event.channel}`)
        respondToEvent(event)
    })

    // All errors in listeners are caught here. If this weren't caught, the program would terminate.
    slackEvents.on('error', (error) => {
        console.log(`slack error: ${error}`)
    })
}

async function respondToEvent(data) {
    try {
        let textMessage = "Your command is unavailable <@" + data.user + "> try using `help`"
        if (data.text.includes('help')) {
            textMessage = await saveMessage(data)
        }
        await web.chat.postMessage({
            channel: data.channel,
            text: textMessage,
            // attachments: [subjects]
        })
        console.log('Message posted!')
    } catch (error) {
        console.log(error)
    }
}

async function saveMessage(data){
    replyMessage = "Something wrong please try again <@" + data.user + ">";
    var helpdesk = new helpdeskSchema({
        chatId: data.client_msg_id,
        type: "slack",
        text: data.text,
        from: data.user,
        raw: JSON.stringify(data)
    });
    let save = await helpdesk.save();
    if (save) {
        replyMessage = "Your message has been saved <@" + data.user + ">";
    }
    return replyMessage;
}

module.exports.listenForEvents = listenForEvents
module.exports.respondToEvent = respondToEvent