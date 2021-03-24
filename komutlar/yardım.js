const Discord = require('discord.js');

exports.run = function(client, message) {
const embed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setTitle('» QPBOT Komut Sistemleri')
.setTimestamp()
.addField('» *moderasyon', 'Moderasyon menüsünü açar')
.addField('» *guard', 'Guard Menüsünü açar')
.addField('» *bilgi', 'bilgiler menüsünü açar')
.setFooter('© 2021 QPBOT', client.user.avatarURL())
.setTimestamp()
.setThumbnail(client.user.avatarURL())
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["yardım","yardim"], 
  permLevel: 0 
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};