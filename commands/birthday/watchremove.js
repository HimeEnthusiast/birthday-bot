const commando = require('discord.js-commando');
const fs = require('fs');

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
        fs.readFile('./JSON/watchlist.json', 'utf-8', function(err, data) {
            if (err) {
                message.channel.send("Sorry, I'm having some trouble! Can you make sure I'm okay?");
                console.log(err);

            } else {
                let watchlist = JSON.parse(data);

                for(let x in watchlist.watch) {
                    //If the user matches an entry in the JSON file, their entry will be removed.
                    if(message.author.id == watchlist.watch[x].user) {
                        watchlist.watch.splice(x, 1);

                        fs.writeFile('./JSON/watchlist.json', JSON.stringify(watchlist), 'utf-8', function(err) {
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