const Discord = require("discord.js")
const config = require("../config.json")
const db = require("quick.db")

module.exports.run = async (bot, message, args) => {
    var bal = db.get(`money_${message.guild.id}_${message.author.id}`)

    if(bal == null) db.set(`money_${message.guild.id}_${message.author.id}`, 0)

    function balanceget() {
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username + "'s Money")
            .setDescription(`${bal}`)
            .setColor("BLUE")
        message.channel.send(embed)
    }

    setTimeout(balanceget, 1500)
}

module.exports.config = {
    name: "balance",
    description: "",
    usage: "!bal",
    accessableby: "Members",
    aliases: ['bal', 'money']
}