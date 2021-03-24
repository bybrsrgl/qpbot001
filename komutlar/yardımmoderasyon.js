const Discord = require('discord.js');

exports.run = function(client, message) {
const embed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setTitle('» QPBOT Komut Sistemleri')
.setTimestamp()
.addField('» *ban', 'Etiketlediğiniz kişiyi sunucudan yasaklar')
.addField('» *kick', 'Etiketlediğiniz kişiyi sunucudan atar')
.addField('» *oylama', 'Oylama Başlatır')
.addField('» *rolver', 'Etiketlediğiniz kişiye etiketlediğiniz rolü verir')
.addField('» *sil', 'belli bir sayıdaki mesajları siler')
.addField('» *yavaşmod', 'yavaş modu aktif eder')
.addField('» *yetkilerim', 'yetkilerinizi gösterir')
.setFooter('© 2021 QPBOT', client.user.avatarURL())
.setTimestamp()
.setThumbnail(client.user.avatarURL())
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["yardımmoderasyon","moderasyon"], 
  permLevel: 0 
};

exports.help = {
  name: 'moderasyon',
  description: 'Tüm komutları gösterir.',
  usage: 'moderasyon'
};