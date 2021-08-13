const Discord = require("discord.js")
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
    return message.channel.send(`🏓 PONG`);
}

module.exports.config = {
    name: "ping",
    description: "",
    usage: "!ping",
    accessableby: "Members",
    aliases: ['pong']
}