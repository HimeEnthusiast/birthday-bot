const commando = require('discord.js-commando');
const fs = require('fs');

class DeleteDate extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'delete',
            group: 'birthday',
            memberName: 'delete',
            description: "Allows the user to delete their saved birth date so they me enter a new one or opt out of a birthday wish."
        });
    }
    
    async run(message, args) {

        fs.readFile('./JSON/date.json', 'utf-8', function(err, data) {
            if (err) {
                message.channel.send("Sorry, I'm having some trouble! Can you make sure I'm okay?");
                console.log(err);

            } else { //If the file can be read, the command will continue
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
                }

                if (check == true) {
                    user.defChannel.birthday.splice(index, 1);

                    fs.writeFile('./JSON/date.json', JSON.stringify(user), 'utf-8', function(err) {
                        if (err) {
                            console.log(err);
                
                        } else {
                            message.channel.send("Your birthday has been deleted!");
                        }
                    });
                } else {
                    message.channel.send("You don't seem to have a birthday registered!");
                }
            }    
        });
    }
}

module.exports = DeleteDate;