//writes a time to the json file in which to check for birthdays and send messages
const commando = require('discord.js-commando');
const fs = require('fs');

class SetTime extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'settime',
            group: 'birthday',
            memberName: 'settime',
            description: "Sets the time in which the bot sends birthday announcements. Enter in a HH:MM format, 24 hour time. (Requires admin permissions)"
        });
    }

    async run(message, args) {
        let messageContent = message.content.split(' ')[1]; //Saves message without command

        fs.readFile('./JSON/date.json', 'utf-8', function(err, data) {
            if (err) {
                message.channel.send("Sorry, I'm having some trouble! Can you make sure I'm okay?");
                console.log(err);
            
            } else {
                let user = JSON.parse(data);

                if  (messageContent != null && messageContent != undefined && messageContent != '') {
                    
                    if (message.member.hasPermission("ADMINISTRATOR")) {
                        let timeReg = new RegExp(/^(([0-1]{0,1}[0-9])|(2[0-3])):[0-5]{0,1}[0-9]$/); //regex for proper time format

                        if (messageContent.match(timeReg)) {
                            user.defChannel.time = messageContent;

                            fs.writeFile('./JSON/date.json', JSON.stringify(user), 'utf-8', function(err) {
                                if (err) {
                                    console.log(err);
                                
                                } else {
                                    message.channel.send(messageContent + " is now the announcement time.");
                                }
                            });
                        
                        } else {
                            message.channel.send("Please enter the time in HH:MM format, 24 hour time.");
                        }
                    } else {
                        message.channel.send("I'm sorry, but you don't have admin permissions! Please ask for an admin's help~");
                    }
                } else {
                    message.channel.send("Please enter a time in HH:MM format, 24 hour time.");
                }
            }
        });
    }
}

module.exports = SetTime;