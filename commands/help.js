const Discord = require("discord.js")
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {

    let helpArray = message.content.split(" ");
    let helpArgs = helpArray.slice(1);

    if(!helpArgs[0]) {
        var embed = new Discord.MessageEmbed()
        .setAuthor(`Here is the available commands to use:`)
        .setDescription(`
        **FUN**
        ${config.prefix}ping
        ${config.prefix}botinfo
        ${config.prefix}hort <heads or tails> <amount>
        ${config.prefix}meme
        ${config.prefix}buy
        ${config.prefix}daily
        ${config.prefix}balance
        ${config.prefix}8ball <question>
        `)
        .addFields({ name: 'Prefix', value: `${config.prefix}`, inline: true})
        .setColor('#00FFF3')
        .setFooter("<> is required and () is optional")
        message.channel.send(embed);
    }

        if(helpArgs[0]) {
            let command = helpArgs[0];
            if (bot.commands.has(command)) {
                command = bot.commands.get(command);
                var embed = new Discord.MessageEmbed()
                    .setAuthor(`${command.config.name} Command`)
                    .setDescription(`
                    - **Command's Description** __${command.config.description || "There is no Description for this command."}__
                    - **Command's Usage:** __${command.config.usage || "No Usage"}__
                    - **Command's Permissions:** __${command.config.accessableby || "Members"}__
                    - **Command's Aliases:** __${command.config.aliases || "No Aliases"}__
                    `)
                    .setColor('#2EFF00')

         message.channel.send(embed);
    }}
}

module.exports.config = {
    name: "help",
    description: "",
    usage: "!help",
    accessableby: "Members",
    aliases: []
}