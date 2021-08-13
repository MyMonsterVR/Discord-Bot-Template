const Discord = require("discord.js");
const config = require("../config.json");
const db = require("quick.db");
const { bot } = require("../index.js");
const ms = require("parse-ms");
const os = require("os");

module.exports.run = async (bot, message, args) => {
  const core = os.cpus()[0];

  const sm = await message.channel.send("pinging...");
  await sm.delete();
  await db.fetch("test12345");
  const sm2 = await message.channel.send("db tested...");
  await sm2.delete();
  const Ban = bot.users.cache.get("114441250647572489");
  let bn = await db.fetch("bn");
  if (!bn || bn == null || isNaN(bn)) {
    bn = await db.set("bn", 1);
  } else {
    bn = await db.add("bn", 1);
  }

  var usedMemory = os.totalmem() - os.freemem(),
    totalMemory = os.totalmem();

  var getpercentage = ((usedMemory / totalMemory) * 100).toFixed(2) + "%";

  var isWin = process.platform === "win32";

  const embed = new Discord.MessageEmbed()
    .setTitle("Info")
    .setDescription(`Here's some information about Hedgehog Bot`)
    .setAuthor(`Bot made by ${Ban.tag}`, Ban.displayAvatarURL)
    .setFooter(bot.user.tag, bot.user.displayAvatarURL)
    .setColor("BLUE")
    .addField(
      "Pings",
      `bot Ping: \`${
        Math.floor(bot.ping * 100) / 100
      } ms\`\nMessage Roundtrip: \`${
        Math.floor(bot.ping * 100) / 100
      } ms\`\nDatabase Reading: \`${
        Math.floor((sm2.createdAt - sm.createdAt) * 100) / 100
      } ms\`\nBot Uptime: \`${Math.floor(bot.uptime / 1000)} Seconds\``
    )
    .addField(
      "Development",
      `Coded By: ${Ban} (${
        Ban.id
      })\nCoded Using: \`Node.JS | Discord.JS\`\nBuild Number: \`${(
        bn * 0x0fca3b
      )
        .toString(16)
        .toUpperCase()}\``
    )
    .addField(
      "Servers",
      `I'm serving ${bot.guilds.cache.size} servers, with ${bot.users.cache.size} users in total.`
    )
    .addField(
      "Server Stats",
      `This server has ${message.guild.members.cache.size} members, ${message.guild.roles.cache.size} roles, ${message.guild.channels.cache.size} channels, and ${message.guild.emojis.cache.size} emojis.`
    )
    .addField("System", [
      `**❯ Platform:** Windows ${process.arch}`,
      `**❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
      `**❯ CPU:**`,
      `Cores: ${os.cpus().length}`,
      `Model: ${core.model}`,
      `Speed: ${core.speed}MHz`,
      `**❯ Memory:**`,
      `Memory used in GB: ${usedMemory / Math.pow(1024, 3).toFixed(2)}`,
      `Used memory: ${getpercentage}`,
    ])
    .setTimestamp();

  //IS NOT WINDOWS

  const embed1 = new Discord.MessageEmbed()
    .setTitle("Info")
    .setDescription(`Here's some information about Hedgehog Bot`)
    .setAuthor(`Bot made by ${Ban.tag}`, Ban.displayAvatarURL)
    .setFooter(bot.user.tag, bot.user.displayAvatarURL)
    .setColor("BLUE")
    .addField(
      "Pings",
      `bot Ping: \`${
        Math.floor(bot.ping * 100) / 100
      } ms\`\nMessage Roundtrip: \`${
        Math.floor(bot.ping * 100) / 100
      } ms\`\nDatabase Reading: \`${
        Math.floor((sm2.createdAt - sm.createdAt) * 100) / 100
      } ms\`\nBot Uptime: \`${Math.floor(bot.uptime / 1000)} Seconds\``
    )
    .addField(
      "Development",
      `Coded By: ${Ban} (${
        Ban.id
      })\nCoded Using: \`Node.JS | Discord.JS\`\nBuild Number: \`${(
        bn * 0x0fca3b
      )
        .toString(16)
        .toUpperCase()}\``
    )
    .addField(
      "Servers",
      `I'm serving ${bot.guilds.cache.size} servers, with ${bot.users.cache.size} users in total.`
    )
    .addField(
      "Server Stats",
      `This server has ${message.guild.members.cache.size} members, ${message.guild.roles.cache.size} roles, ${message.guild.channels.cache.size} channels, and ${message.guild.emojis.cache.size} emojis.`
    )
    .addField("System", [
      `**❯ Platform:** ${process.arch}`,
      `**❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
      `**❯ CPU:**`,
      `Cores: ${os.cpus().length}`,
      `Model: ${core.model}`,
      `Speed: ${core.speed}MHz`,
      `**❯ Memory:**`,
      `Memory used in GB: ${usedMemory / Math.pow(1024, 3).toFixed(2)}`,
      `Used memory: ${getpercentage}`,
    ])
    .setTimestamp();

  switch (isWin) {
    case true:
      message.channel.send(embed);
      break;
    case false:
      message.channel.send(embed1);
      break;
  }
};

module.exports.config = {
  name: "botinfo",
  description: "gives you information about the bot",
  usage: "!botinfo",
  accessableby: "Members",
  aliases: [""],
};
