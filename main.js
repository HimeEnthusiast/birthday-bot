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

//set activity
bot.on('ready', () => {
    console.log("Ready!");
    bot.user.setActivity('Have a good day :)');
});

  ////////////////////////////
 //Check JSON file for date//
////////////////////////////
//Move to new file? pass through: bot, channelname, fs?
bot.on('ready', () => {
    var checkTime = new Date("06-07-2019 00:00:00");
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

                //read json file to find default channel
                generalChannel = user.defChannel.name;
                
                for(var x in user.defChannel.birthday) {
                    //Check if the current date matches any dates in the file
                    //send a funny little picture :-)
                    //dm everyone to tell them that it's someone's birthday
                    if (getFormatDate(fullDate) == user.defChannel.birthday[x].day) {
                        generalChannel.send("Happy birthday, " + "<@" + user.defChannel.birthday[x].user + ">" + "! I hope it's great.");

                    }
                }
            }
        });
    }, timeUntil);
});