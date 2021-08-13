const Discord = require("discord.js")
const config = require("../config.json")
const db = require("quick.db")

module.exports.run = async (bot, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username)
    message.channel.send(embed)
}

module.exports.config = {
    name: "buy",
    description: "",
    usage: "!buy",
    accessableby: "Members",
    aliases: ['shop']
}