const commando = require('discord.js-commando');
const fs = require('fs');
var user;

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

        fs.readFile('./date.json', 'utf-8', function(err, data) {
            if (err) {
                message.channel.send("Sorry, I'm having some trouble! Can you make sure I'm okay?");
                console.log(err);

            } else { //If the file can be read, the command will continue
                user = JSON.parse(data);

                for(var x in user.defChannel.birthday) {
                    if(message.author.id == user.defChannel.birthday[x].user) {
                        delete user.defChannel.birthday[x].user;
                        delete user.defChannel.birthday[x].day;
                        delete user.defChannel.birthday[x].name;

                        //Write to the file
                        fs.writeFile('./date.json', JSON.stringify(user), 'utf-8', function(err) {
                            if (err) {
                                console.log(err);

                            } else {
                                message.channel.send("Your birthday has been deleted! You are now able to enter a new date.");
                            }
                        });
                    } else {
                        message.channel.send("You don't seem to have a birthday set! Please register your birthday.");
                        break;
                    }
                }


            }    
        });
    }
    
}

module.exports = DeleteDate;