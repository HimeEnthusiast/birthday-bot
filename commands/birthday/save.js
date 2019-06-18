const commando = require('discord.js-commando');
const fs = require('fs');
var user; 


class SaveBirthDay extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'save',
            group: 'birthday',
            memberName: 'save',
            examples: ['02-02-1997'],
            description: "Saves the user's birthday"
        });
    }

    //The write to file & push code occurs twice, so i will write a function for that
    async run(message, args) {
        var messageContent = message.content.split(' ')[1]; //Saves message without command

        //Read the JSON file
        fs.readFile('./date.json', 'utf-8', function(err, data) {

            if (err) {
                message.channel.send("Sorry, I'm having some trouble! Try again?");
                console.log(err);

            } else { //If the file can be read, the command will continue
                user = JSON.parse(data); 
                var dateReg = new RegExp(/\d{1,2}-\d{1,2}-\d{4}/gm);

                if  (messageContent != null && messageContent != undefined && messageContent != '') {
                    if (messageContent.match(dateReg)) {
                        if (user.defChannel.birthday != '') { //Checking if the JSON file has any entries or not (Loop won't run if it's empty!!)
                            
                            for(var x in user.defChannel.birthday) {
                                //Check if the user's name is already in the JSON file
                                if (message.author.id == user.defChannel.birthday[x].user) {
                                    message.channel.send("You have already registered your birthday!");
                                    break;
        
                                } else {
        
                                    //If the name isn't already registered, continue and push data into array
                                    user.defChannel.birthday.push ({
                                        user: message.author.id,
                                        name: message.author.username,
                                        day: messageContent
                                    });
        
                                    //Write to the file
                                    fs.writeFile('./date.json', JSON.stringify(user), 'utf-8', function(err) {
                                        if (err) {
                                            console.log(err);
        
                                        } else {
                                            message.channel.send("Your birthday has been successfully recorded!");
                                        }
                                    });
                                }
                            } 
                        } else {

                            //If the JSON file doesn't have any entries, skip the check and just push to the array and write to file
                            user.defChannel.birthday.push ({
                                user: message.author.id,
                                name: message.author.username,
                                day: messageContent
                            });

                            fs.writeFile('./date.json', JSON.stringify(user), 'utf-8', function(err) {
                                if (err) {
                                    console.log(err);

                                } else {
                                    message.channel.send("Your birthday has been succefully recorded!");
                                }
                            });
                        }

                    } else { //If format is wrong, everything will be ignored and the command will exit, then tell the user the correct format
                        message.channel.send("I'm sorry! You're message isn't in the correct format. Please type your date like this: 'MM-DD-YYYY'")

                    }
                } else {
                    message.channel.send("I'm sorry, but your message is empty! Please type a date in this format: 'MM-DD-YYYY'");
                }

            }

        });


    }

}


module.exports = SaveBirthDay;