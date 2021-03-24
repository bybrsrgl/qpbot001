const Discord = require('discord.js');

exports.run = function(client, message) {
const embed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setTitle('» QPBOT Komut Sistemleri')
.setTimestamp()
.addField('» *kanalkapat', 'bulunduğunuz kanala mesaj atılmasını engeller')
.addField('» *kanalaç', 'bulunduğunuz kanaldaki mesaj engelini kaldırır')
.addField('» *küfürengel', 'sunucuda küfür edilmesini engeller')
.addField('» *reklamengel', 'sunucuda reklam yapılmasını engeller')
.addField('» *capsengel', 'sunucuda capslockun abartılı şekilde kullanılmasını engeller')
.setFooter('© 2021 QPBOT', client.user.avatarURL())
.setTimestamp()
.setThumbnail(client.user.avatarURL())
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["yardımguard","guard"], 
  permLevel: 0 
};

exports.help = {
  name: 'guard',
  description: 'Tüm komutları gösterir.',
  usage: 'guard'
};