const commando = require('discord.js-commando');
const fs = require('fs');

class SetChannel extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'setchannel',
            group: 'birthday',
            memberName: 'setchannel',
            description: "Sets the current channel to be the one that birthday messages will be sent in, and registers the server name. (Requires admin permissions)"
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

                if (message.member.hasPermission("ADMINISTRATOR")) {
                    user.defChannel.name = message.channel.name;
                    user.defChannel.server = message.guild.name;

                    fs.writeFile('./JSON/date.json', JSON.stringify(user), 'utf-8', function(err) {
                        if (err) {
                            console.log(err);
    
                        } else {
                            message.channel.send(message.channel.name + " is now the announcment channel.");
                        }
                    });
                } else {
                    message.channel.send("I'm sorry, but you don't have admin permissions! Please ask for an admin's help~");
                }
            }
        });
    }  
}

module.exports = SetChannel;