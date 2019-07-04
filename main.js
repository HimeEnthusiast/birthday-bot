const commando = require('discord.js-commando');
const bot = new commando.Client();

const fs = require('fs');

//Commando commands
bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('birthday', 'Birthday');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

//log in
bot.login('NTc4MjE3ODc0NDAxOTE4OTc2.XPGzUg.vsYCIKSOPfwBkAuZ1tjO0kMzk6w');

//set activity. probably getting rid of!
bot.on('ready', () => {
    console.log("Ready!");
    bot.user.setActivity('Have a good day :)');
});

/*

Move to new file so this can be replaced with a function. Pass through: bot, channelname, fs?
 
*/

//Checking JSON files for date. 
bot.on('ready', () => {
    //Time that message is sent would be put into
    var checkTime = new Date();
    var timeUntil = checkTime.getTime() - new Date().getTime();

    
    //Checking happens inside time out!
    setTimeout(function() {
        var fullDate = new Date();

        function getFormatDate(date) {
            var year = date.getFullYear();
            var month = (1 + date.getMonth()).toString().padStart(2, '0');
            var day = date.getDate().toString().padStart(2, '0');

            return month + "-" + day + "-" + year;
        }

        //Read JSON file
        fs.readFile('./date.json', 'utf-8', function(err, data) {

            if (err) {
                console.log(err);

            } else { //If the file can be read, the command will continue
                user = JSON.parse(data);

                //read json file to find default channel.
                generalChannel = user.defChannel.name;
                
                for(var x in user.defChannel.birthday) {
                    //Check if the current date matches any dates in the file
                    //send a funny little picture :-)
                    //dm everyone to tell them that it's someone's birthday
                    if (getFormatDate(fullDate) == user.defChannel.birthday[x].day) {
                        generalChannel.send("Happy birthday, " + "<@" + user.defChannel.birthday[x].user + ">" + "! I hope it's great.");

                        /*

                        In the same check, loop throught the watchlist. Then, check is the birthday user's id matches the watchlist user id. Either have bot say happy birthday personally or just not DM them.

                        */

                    }
                }
            }
        });
    }, timeUntil);
});