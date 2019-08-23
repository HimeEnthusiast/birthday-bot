const commando = require('discord.js-commando');
const bot = new commando.Client();

const schedule = require('node-schedule');
const fs = require('fs');
const send = require("./Functions/sendFunction.js");

//Command folders
bot.registry.registerGroup('birthday', 'Birthday');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

//log in
bot.login('NTc4MjE3ODc0NDAxOTE4OTc2.XPGzUg.vsYCIKSOPfwBkAuZ1tjO0kMzk6w');

bot.on('ready', () => {
    console.log("Ready!");
    bot.user.setActivity('Have a good day :)');
    send.sendMessage(fs, bot, schedule);
});