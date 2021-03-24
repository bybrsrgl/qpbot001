const db = require('wio.db');
const Discord = require('discord.js')

exports.run = (client, message, args, func) => {

  
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
    if(!args[0]) return message.channel.send("Doğru kullanım `a.küfürengel aç/kapat`")
      if(args[0] === "aç"){
    var anahtar = db.fetch(`narcoskfurengel_${message.guild.id}`)
    if(anahtar === "acik") return message.channel.send("Zaten açık!!")
    db.set(`narcoskfurengel_${message.guild.id}`, 'acik')
    message.channel.send(`Küfür engel sistemi açıldı !!`)
   }
    if(args[0] === "kapat") {
      var anahtar = db.fetch(`narcoskfurengel_${message.guild.id}`)
      if(!anahtar) return message.channel.send("Zaten kapalıymış.")
      db.delete(`narcoskfurengel_${message.guild.id}`)
      message.channel.send("Başarıyla kapatıldı")
          
     
    }
     
 
  
  
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};
  
  exports.help = {
    name: 'küfürengel',
    description: '',
    usage: 'küfür-engel'
};