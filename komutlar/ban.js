const Discord = require('discord.js');
const db = require('wio.db')
const client = new Discord.Client();

exports.run = (client, message, args) => {

  if (!message.guild) {
  const narcosdmuyar = new Discord.messageEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':warning: Uyarı :warning:', '`ban` adlı komutu özel mesajlarda kullanamazsın.')
  return message.author.sendEmbed(narcosdmuyar); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (reason.length < 1) return message.reply('Ban sebebini yazmalısın.');
  if (message.mentions.users.size < 1) return message.reply('Kimi banlayacağını yazmalısın.').catch(console.error);

  if (!message.guild.member(user).bannable) return message.reply('Yetkilileri banlayamam.');
  message.guild.ban(user, 2);

  const yazı1 = new Discord.messageEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Eylem:', 'Sunucudan Yasaklama <a:banlan1:762608698962477076><a:banlan3:762608712707211306><a:banlan2:762608701906878504>')
    .addField('Yasaklanan Kullanıcı:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Yasaklayan Yetkili:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Yasaklama Sebebi:', reason);
  return message.channel.sendEmbed(yazı1);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ban","idban"],
  permLevel: 2
};

exports.help = {
  name: 'ban',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.',
  usage: 'ban [kullanıcı] [sebep]'
};