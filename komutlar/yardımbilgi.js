const Discord = require('discord.js');

exports.run = function(client, message) {
const embed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setTitle('» QPBOT Komut Sistemleri')
.setTimestamp()
.addField('» *kullanıcıbilgi', 'kullanıcı hakkındaki bilgileri gösterir')
.addField('» *sunucubilgi', 'sunucu hakkındaki bilgileri gösterir')
.addField('» *yetkilerim', 'yetkilerinizi gösterir')
.setFooter('© 2021 QPBOT', client.user.avatarURL())
.setTimestamp()
.setThumbnail(client.user.avatarURL())
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["yardımbilgi","bilgi"], 
  permLevel: 0 
};

exports.help = {
  name: 'bilgi',
  description: 'Tüm komutları gösterir.',
  usage: 'bilgi'
};