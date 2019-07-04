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

//set activity. probably getting rid of??
bot.on('ready', () => {
    console.log("Ready!");
    bot.user.setActivity('Have a good day :)');
});

/*

Move to new file so this can be replaced with a function. Pass through: bot, channelname, fs?
 
*/

//Checking JSON files for date. 
bot.on('ready', () => {
    //Time that message is sent would be put into. current date + time passed in. 24 hour format or nah???
    var checkTime = new Date("2019-07-04 02:35:00");
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
                var generalChannel = bot.channels.find("name", user.defChannel.name);
                
                for(let x in user.defChannel.birthday) {
                    //Check if the current date matches any dates in the file
                    //send a funny little picture :-)
                    //dm everyone to tell them that it's someone's birthday
                    if (getFormatDate(fullDate) == user.defChannel.birthday[x].day) {
                        generalChannel.send("Happy birthday, " + "<@" + user.defChannel.birthday[x].user + ">" + "! I hope it's great.");
                        fs.readFile('./watchlist.json', 'utf-8', function(err, data) {

                            if (err) {
                                message.channel.send("Sorry, I'm having some trouble! Can you make sure I'm okay?");
                                console.log(err);

                            } else {
                                watch = JSON.parse(data);

                                for(let y in watch.watch) {
                                    if (user.defChannel.birthday[x].user == watch.watch[y].user) {
                                        
                                        bot.users.get(watch.watch[y].user).send("It's your birthday, check out your birthday messages in " + user.defChannel.server + "!");
                                    } else {
                                        
                                        bot.users.get(watch.watch[y].user).send("It's someone's birthday, go tell them happy birthday in" + user.defChannel.server + "!");
                                    }
                                }
                            }
                       });

                    }
                }
            }
        });
    }, timeUntil);
});