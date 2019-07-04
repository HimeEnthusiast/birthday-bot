const commando = require('discord.js-commando');
const fs = require('fs');
var user;

class SetChannel extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'setchannel',
            group: 'birthday',
            memberName: 'setchannel',
            description: "Sets the current channel to be the one that birthday messages will be sent in. (Requires admin permissions)"
        });
    }

    /*

    what i wanted to do was get the user to enter a channel name, check if it exists then set it as the messaging channel but i can't figure out how to get *just* the channel names from the map. it's big complicated. so i had to do it by checking what channel the command was used in and replacing whatever name is in the json file with it. i dont think it's necessarily bad but i would prefer to make it so the commands could be done all in one place. just feels best to me?

    */

    async run(message, args) {
        var messageContent = message.content.split(' ')[1]; //Saves message without command

        fs.readFile('./date.json', 'utf-8', function(err, data) {
            if (err) {
                message.channel.send("Sorry, I'm having some trouble! Can you make sure I'm okay?");
                console.log(err);

            } else { //If the file can be read, the command will continue
                user = JSON.parse(data);

                if (message.member.hasPermission("ADMINISTRATOR")) {
                    console.log("You're an admin!");

                    user.defChannel.name = message.channel.name;
                    //server = server name
                    user.defChannel.server = message.guild.name;


                    fs.writeFile('./date.json', JSON.stringify(user), 'utf-8', function(err) {
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