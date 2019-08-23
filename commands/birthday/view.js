const commando = require('discord.js-commando');
const fs = require('fs');

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
        fs.readFile('./JSON/date.json', 'utf-8', function(err, data) {
            if (err) {
                message.channel.send("Sorry, I'm having some trouble! Can you make sure I'm okay?");
                console.log(err);

            } else {
                let user = JSON.parse(data);
                let check = false;
                let index;

                if (user.defChannel.birthday != null) {
                    for (let x in user.defChannel.birthday) {
                        index = x;
                        if (message.author.id == user.defChannel.birthday[x].user) {
                            check = true;
                            break;
                        }
                    }

                    if (check == true) {
                        message.channel.send("Your birthday is: " + user.defChannel.birthday[index].day + ". If this is incorrect, you can delete it and try again.");
                    } else {
                        message.channel.send("You don't seem to have a birthday registered!");
                    }
                }
            }    
        });
    } 
}

module.exports = ViewDate;