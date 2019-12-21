const commando = require('discord.js-commando');
const fs = require('fs');

let logger = fs.createWriteStream('errorlog.txt', {
    flags: 'a'
});

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
        fs.readFile('./JSON/watchlist.json', 'utf-8', function(err, data) {
            if (err) {
                message.channel.send("Fatal error! Please check error log.");
                logger.write("\n" + new Date() + " " + err);
            } else {
                let watchlist = JSON.parse(data);
                let check = true;

                if (watchlist.watch != null) {
                    for (let x in watchlist.watch) {
                        if (message.author.id == watchlist.watch[x].user) {
                            check = false;
                            message.channel.send("You are already in the DM list!");
                            break;
                        }
                    }
                }

                if (check == true) {
                    watchlist.watch.push ({
                        user: message.author.id
                    });

                    fs.writeFile('./JSON/watchlist.json', JSON.stringify(watchlist), function(err, data) {
                        if (err) {
                            message.channel.send("Fatal error! Please check error log.");
                            logger.write("\n" + new Date() + " " + err);

                        } else {
                            message.channel.send("You have been added to the DM list!");
                        }
                    });
                }
            }
        });
    }
}

module.exports = WatchList;