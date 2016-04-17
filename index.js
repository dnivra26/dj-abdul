var Bot = require('slackbots');
var openurl = require("openurl");
var url = require('is-url');
var token = process.env.BOT_API_KEY;
var name = process.env.BOT_NAME;

// create a bot
var settings = {
    token: token,
    name: name
};
var bot = new Bot(settings);

var getUserById = function(userId, callback){
     bot.getUsers().then(function(users){
        users.members.forEach(function(user){
            if(user.id === userId){
                callback(user);
            }
        })
        callback(user);
    });
}

bot.on('start', function() {
    bot.postMessageToChannel('chennai', 'Hello channel!');
    bot.postMessageToUser('arvindt', 'hello bro!');
});

bot.on('message', function(message) {
    if(message.type === 'message'){
        if(message.subtype !== 'bot_message'){
            if(message.channel.startsWith('D')){
                getUserById(message.user, function(user){
                    var videoUrl = message.text.substring(1, message.text.length - 1);
                    if(url(videoUrl)){
                        openurl.open(videoUrl);
                    }else {
                        bot.postMessageToUser(user.name, 'Dude... I understand only URLs as of now');
                    }
                });
            }
        }
    }
});
