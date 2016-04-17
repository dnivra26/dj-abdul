var Bot = require('slackbots');
var openurl = require("openurl");
var token = process.env.BOT_API_KEY;
// create a bot
var settings = {
    token: token,
    name: 'DJ Abdul'
};
var bot = new Bot(settings);

bot.on('start', function() {
    bot.postMessageToChannel('chennai', 'Hello channel!');
    bot.postMessageToUser('arvindt', 'hello bro!');
});

bot.on('message', function(message) {
    if(message.type === 'message'){
        if(message.subtype !== 'bot_message'){
            if(message.channel.startsWith('D')){
                var text = message.text;
                openurl.open(text.substring(1, text.length - 1));
            }
        }
    }
});
