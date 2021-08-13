const Discord = require("discord.js")
const config = require("../config.json")
const db = require("quick.db")

module.exports.run = async (bot, message, args) => {
    const amount = args[1];
    const bal = db.fetch(`money_${message.guild.id}_${message.author.id}`)
    const headsortails = ["heads", "tails"];
    const random = headsortails[Math.floor(Math.random() * headsortails.length)];

    if (args[1]) {
        if (bal >= amount) {
            if (random == "heads") {
                if (args[0] == "heads") {
                    message.reply(`Congratulations, you won: $${amount*2}`);
                    db.add(`money_${message.guild.id}_${message.author.id}`, amount);
                }
                else if (args[0] == "tails") {
                    message.reply("You lost $" + amount);
                    db.subtract(`money_${message.guild.id}_${message.author.id}`, amount);
                }
                }
                else if (random == "tails") {
                if (args[0] == "tails") {
                    message.reply(`Congratulations, you won: $${amount*2}`);
                    db.add(`money_${message.guild.id}_${message.author.id}`, amount);
                }
                else if (args[0] == "heads") {
                    message.reply("You lost: " + amount);
                    db.subtract(`money_${message.guild.id}_${message.author.id}`, amount);
                }
            }
            else {
            message.reply("That's not a valid argument")
            }
      }
      else {
        message.reply("You don't have " + `${amount}`)
      }
    }
    else {
      message.reply(`!hort <heads or tails> <amount to bet>`)
    }
}

module.exports.config = {
    name: "headsortails",
    description: "",
    usage: "!headsortails <heads or tails>",
    accessableby: "Members",
    aliases: ['hort']
}