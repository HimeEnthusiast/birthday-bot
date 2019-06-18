const commando = require('discord.js-commando');
const fs = require('fs');
var user;

class ViewDate extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'view',
            group: 'birthday',
            memberName: 'view',
            description: "Allows the user to view their saved birth date."
        });
    }

    async run(message, args) {

        fs.readFile('./date.json', 'utf-8', function(err, data) {
            if (err) {
                message.channel.send("Sorry, I'm having some trouble! Can you make sure I'm okay?");
                console.log(err);

            } else { //If the file can be read, the command will continue
                user = JSON.parse(data);

                for(var x in user.defChannel.birthday) {
                    if(message.author.id == user.defChannel.birthday[x].user) {
                        message.channel.send("Your birthday is: " + user.defChannel.birthday[x].day + ". If this is incorrect, you can delete it and try again.");
                    } else {
                        message.channel.send("You don't seem to have a birthday set! Please register your birthday.");
                        break;
                    }
                }

            }    
        });
    }
    
}

module.exports = ViewDate;