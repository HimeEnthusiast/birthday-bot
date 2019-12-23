function sendMessage(fs, bot, schedule) {

    fs.readFile('./JSON/date.json', 'utf-8', function(err, data) {
        if (err) {
            message.channel.send("Fatal error! Please check error log.");
            logger.write("\n" + new Date() + " " + err);

        } else {
            let user = JSON.parse(data);

            //The time seemed to not want to change in the program without restarting? I'm not sure how to do that so I removed the functionality.
            //It will send messages at 8am, this is in 24 hour time
            schedule.scheduleJob('30 17 * * *', function(){ //SCHEDULE START
                let fullDate = new Date();

                //Formatting the date as it's recorded in the JSON file, to check date
                function getFormatDate(date) {
                    let month = (1 + date.getMonth()).toString().padStart(2, '0');
                    let day = date.getDate().toString().padStart(2, '0');

                    return month + "-" + day;
                }

                let user = JSON.parse(data);
                let generalChannel = bot.channels.find("name", user.defChannel.name); //Checking what channel to send messages in

                for(let x in user.defChannel.birthday) {
                    if (getFormatDate(fullDate) == user.defChannel.birthday[x].day) {
                        fs.readFile('./JSON/images.json', 'utf-8', function(err, data) { //IMAGES
                            if (err) {
                                message.channel.send("Fatal error! Please check error log.");
                                logger.write("\n" + new Date() + " " + err);

                            } else {
                                //Get a random number from 0 to max # of images in the JSON file. Use that number as the index when sending the message.
                                let image = JSON.parse(data);
                                let index = Math.floor(Math.random() * image.image.length + 1);

                                generalChannel.send("Happy birthday, " + "<@" + user.defChannel.birthday[x].user + ">" + "! I hope it's great.", {files: [image.image[index].pic]});
                            }
                        });

                        //Checking who signed up for the DM watchlist.
                        fs.readFile('./JSON/watchlist.json', 'utf-8', function(err, data) { //WATCHLIST
                            if (err) {
                                message.channel.send("Fatal error! Please check error log.");
                                logger.write("\n" + new Date() + " " + err);

                            } else {
                                let watch = JSON.parse(data);

                                for(let y in watch.watch) {
                                    if (user.defChannel.birthday[x].user == watch.watch[y].user) { //If birthday user is in watchlist, alternate message is sent
                                        bot.users.get(watch.watch[y].user).send("It's your birthday, check out your birthday messages in " + user.defChannel.server + "!");
                                            
                                    } else {
                                        bot.users.get(watch.watch[y].user).send("It's " + user.defChannel.birthday[x].name + "'s birthday, go tell them happy birthday in " + user.defChannel.server + "!");
                                    }
                                }
                            }
                        });
                    }
                }
            }); //SCHEDULE END
        }
    });
};

module.exports.sendMessage = sendMessage;