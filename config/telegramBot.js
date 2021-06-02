const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN;
const botSchema = require('../service/telegramBotSchema');

const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async (msg) => {
    try {
        const chatId = msg.chat.id;
        const name = (msg.chat.username ? msg.chat.username : (msg.chat.title ? msg.chat.title : ""));
        
        let param = {
            chatId: chatId
        }
        let data = {
            name: name,
            type: msg.chat.type,
            extData: JSON.stringify(msg)
        }

        let option = {
            upsert: true, 
            new: true, 
            setDefaultsOnInsert: true
        }
        let result = await botSchema.findOneAndUpdate(param, data, option);
        console.log("result::", result);
    } catch (error) {
        console.log("message::", error);
    }
    // send a message to the chat acknowledging receipt of their message
    // bot.sendMessage(chatId, 'Received your message::' + chatId);
});