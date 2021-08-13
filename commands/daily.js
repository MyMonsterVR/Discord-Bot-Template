const Discord = require("discord.js")
const config = require("../config.json")
const db = require("quick.db")
const ms = require('parse-ms')

module.exports.run = async (bot, message, args) => {
    let timeout = 86400000;
    let amount = 100;

    if(message.member.roles.cache.find(r => r.name === "Admin")) amount = 1000;
    else if(message.member.roles.cache.find(r => r.name === "Mod")) amount = 500;
    else if(message.member.roles.cache.find(r => r.name === "Vip")) amount = 300;
    else if(message.member.roles.cache.find(r => r.name === "Member")) amount = 200;

    let daily = await db.fetch(`daily_${message.author.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      let time = ms(timeout - (Date.now() - daily))

      message.channel.send(`You already collected ur daily reward, please come back in **${time.hours}h ${time.minutes}m ${time.seconds}s**`)
    }
    else {
      let embed = new Discord.MessageEmbed()
        .setAuthor("Daily", message.author.AvatarURL)
        .setColor("BLUE")
        .setDescription(`**DAILY REWARD**`)
        .addField(`Money Collected`, amount)

      message.channel.send(embed);

      db.add(`money_${message.guild.id}_${message.author.id}`, amount)
      db.set(`daily_${message.author.id}`, Date.now())
    }
}

module.exports.config = {
    name: "daily",
    description: "",
    usage: "!daily",
    accessableby: "Members",
    aliases: ['']
}