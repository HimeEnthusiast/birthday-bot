const commando = require('discord.js-commando');
const fs = require('fs');
var watchlist;

class WatchRemove extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'unsubscribe',
            group: 'birthday',
            memberName: 'unsubscribe',
            description: "Removes the the user from the DM list."
        });
    }

    async run(message, args) {

        fs.readFile('./watchlist.json', 'utf-8', function(err, data) {
            if (err) {
                message.channel.send("Sorry, I'm having some trouble! Can you make sure I'm okay?");
                console.log(err);

            } else { //If the file can be read, the command will continue
                watchlist = JSON.parse(data);
                console.log("the loop should start now");

                for(var x in watchlist.watch) {
                    if(message.author.id == watchlist.watch[x].user) {
                        delete watchlist.watch[x].user;
                        console.log(watchlist.watch[x].user);

                        //Write to the file
                        fs.writeFile('./watchlist.json', JSON.stringify(watchlist), 'utf-8', function(err) {
                            if (err) {
                                console.log(err);

                            } else {
                                message.channel.send("You have been removed from the watch list.");
                            }
                        });
                    } else {
                        message.channel.send("You don't seem to be on the watch list!");
                        break;
                    }
                }


            }    
        });
    }
    
}

module.exports = WatchRemove;