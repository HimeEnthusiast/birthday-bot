const commando = require('discord.js-commando');
const fs = require('fs');
var watchlist;

class WatchList extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'subscribe',
            group: 'birthday',
            memberName: 'subscribe',
            description: "Adds the user to a list where they will be DM'ed birthday reminders, in case they keep the server muted."
        });
    }

    async run(message, args) {

        fs.readFile('./watchlist.json', 'utf-8', function(err, data) {
            if (err) {
                message.channel.send("Sorry, I'm having some trouble! Can you make sure I'm okay?");
                console.log(err);

            } else { //If the file can be read, the command will continue
                watchlist = JSON.parse(data);

                if (watchlist.watch != '') { //Checking if the JSON file has any entries or not (Loop won't run if it's empty!!)
                            
                            for(var x in watchlist.watch) {
                                //Check if the user's name is already in the JSON file
                                if (message.author.id == watchlist.watch[x].user) {
                                    message.channel.send("You are already on the watchlist.");
                                    break;
        
                                } else {
        
                                    //If the name isn't already registered, continue and push data into array
                                    watchlist.watch.push ({
                                        user: message.author.id,
                                    });
        
                                    //Write to the file
                                    fs.writeFile('./watchlist.json', JSON.stringify(watchlist), 'utf-8', function(err) {
                                        if (err) {
                                            console.log(err);
        
                                        } else {
                                            message.channel.send("You've been added to the watch list!");
                                        }
                                    });
                                }
                            } 
                        } else {

                            //If the JSON file doesn't have any entries, skip the check and just push to the array and write to file
                            watchlist.watch.push ({
                                user: message.author.id,
                            });

                            fs.writeFile('./watchlist.json', JSON.stringify(watchlist), 'utf-8', function(err) {
                                if (err) {
                                    console.log(err);

                                } else {
                                    message.channel.send("You've been added to the watch list!");
                                }
                            });
                        }
                }    
        });
    }
    
}

module.exports = WatchList;