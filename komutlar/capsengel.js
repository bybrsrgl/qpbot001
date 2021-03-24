const db = require('wio.db');
const Discord = require('discord.js')

exports.run = (client, message, args, func) => {


  
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  
  if(!args[0]) return message.channel.send("Doğru kullanım `a.capsengel aç/kapat`")
      if(args[0] === "aç"){
    db.set(`cpsengel_${message.guild.id}`, 'acik')
    message.channel.send(`Capslock engel başarıyla açıldı`)
   }
    if(args[0] === "kapat") {
    {db.delete(`cpsengel_${message.guild.id}`)
    message.channel.send('Capslock engel başarıyla kapatıldı.')   }
     }
 
  
  
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};
  
  exports.help = {
    name: 'capsengel',
    description: '',
    usage: 'prefix <prefix>'
};