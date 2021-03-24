const Discord = require("discord.js")
exports.run = async(client, message, args) => {

const embed = new Discord.MessageEmbed()
.setThumbnail("https://cdn.discordapp.com/avatars/793054570057433108/db037ade39daf6a4c68e4aa9eb226ad4.png?size=4096")   
.addField("Selam, beni buradan davet edebilirsin","[TIKLA](https://discord.com/api/oauth2/authorize?client_id=793054570057433108&permissions=8&scope=bot)")
message.channel.send(embed);
  };

  module.exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
  };

  module.exports.help = {
    name: "davet",
    description: "Davet linki",
    usage: "Davet Linki"
  };