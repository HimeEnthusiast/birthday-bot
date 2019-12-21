const commando = require('discord.js-commando');
const fs = require('fs');

let logger = fs.createWriteStream('errorlog.txt', {
    flags: 'a'
});

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
                message.channel.send("Fatal error! Please check error log.");
                logger.write("\n" + new Date() + " " + err);

            } else {
                let watchlist = JSON.parse(data);
                let check = false;
                let index;

                if (watchlist.watch != null) {
                    for (let x in watchlist.watch) {
                        index = x;

                        if (message.author.id == watchlist.watch[x].user) {
                            check = true;
                            break;
                        }
                    }
                } else {
                    message.channel.send("You aren't in the watchlist!");
                }

                if (check == true) {
                    watchlist.watch.splice(index, 1);

                    fs.writeFile('./JSON/watchlist.json', JSON.stringify(watchlist), function(err, data) {
                        if (err) {
                            message.channel.send("Fatal error! Please check error log.");
                            logger.write("\n" + new Date() + " " + err);

                        } else {
                            message.channel.send("You have been removed from the DM list!");
                        }
                    });
                } else {
                    message.channel.send("You aren't in the watchlist!");
                }
            }    
        });
    }
}

module.exports = WatchRemove;