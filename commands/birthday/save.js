const commando = require('discord.js-commando');
const fs = require('fs');

let logger = fs.createWriteStream('errorlog.txt', {
    flags: 'a'
});

class SaveBirthDay extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'save',
            group: 'birthday',
            memberName: 'save',
            description: "Saves the user's birthday."
        });
    }

    async run(message, args) {
        let messageContent = message.content.split(' ')[1];
        let user;

        fs.readFile('./JSON/date.json', 'utf-8', function(err, data) {
            if (err) {
                message.channel.send("Fatal error! Please check error log.");
                logger.write("\n" + new Date() + " " + err);

            } else {
                user = JSON.parse(data);
                let dateReg = new RegExp(/\d{1,2}-\d{1,2}$/);

                if (messageContent != null && messageContent != undefined && messageContent != '') {
                    if (messageContent.match(dateReg)) {
                        let check = true;

                        if (user.defChannel.birthday != null) {
                            for (let x in user.defChannel.birthday) {
                                if (message.author.id == user.defChannel.birthday[x].user) {
                                    check = false;
                                    message.channel.send("You have already registered your birthday!");
                                    break;
                                }
                            }
                        }

                        if (check == true) {
                            user.defChannel.birthday.push ({
                                user: message.author.id,
                                name: message.author.username,
                                day: messageContent
                            });
                        
                            //Write to the file
                            fs.writeFile('./JSON/watchlist.json', JSON.stringify(watchlist), 'utf-8', function(err) {
                                if (err) {
                                    logger.write("\n" + new Date() + " " + err);
                        
                                } else {
                                    message.channel.send("Your birthday has been successfully recorded!");
                                }
                            });
                        }
                    } else {
                        message.channel.send("Your message isn't in the correct format, please use MM-DD.");
                    }
                } else {
                    message.channel.send("Your message is empty, please enter a date in MM-DD format.");
                }
            }
        });
    }
}

module.exports = SaveBirthDay;