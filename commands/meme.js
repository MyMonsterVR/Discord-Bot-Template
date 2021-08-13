const Discord = require("discord.js")
const config = require("../config.json")
const snekfetch = require('snekfetch');

module.exports.run = async (bot, message, args) => {
    const subReddits = ["memes", "dankmemes", "MemeEconomy"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    const { body } = await snekfetch
        .get(`https://www.reddit.com/r/${random}.json?sort=top&t=monthly`)

    const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);

    if (!allowed.length) return message.channel.send('It seems we are out of fresh memes!, Try again later.');

    const randomnumber = Math.floor(Math.random() * allowed.length)

    console.log(`${message.author.username} just used !meme`);

    const embed = new Discord.MessageEmbed()
        .setColor(0x00A2E8)
        .setTitle(allowed[randomnumber].data.title)
        .setDescription("Posted by: " + allowed[randomnumber].data.author)
        .setImage(allowed[randomnumber].data.url)
        .addField("Other info:", "Up votes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments)
        .setFooter(`memes provided by r/${random}`)

    message.channel.send("Finding memes now.")
        .then((sentEmbed) => {
            setTimeout(function () {
                sentEmbed.edit(embed);
                sentEmbed.react("👍");
                sentEmbed.react("👎");
            }, 1500);
        });
}

module.exports.config = {
    name: "meme",
    description: "This command will provide you with a meme",
    usage: "!meme",
    accessableby: "Members",
    aliases: ['memes']
}