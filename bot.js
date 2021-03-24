const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const { Client, Util } = require('discord.js');
require('./util/eventLoader.js')(client);
const fs = require('fs');
const  db  = require('wio.db')


var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

/////afk

client.on("message", async message => {
    const ms = require("parse-ms");
  
    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.content.includes(`${prefix}afk`)) return;
  
    if (await db.fetch(`afk_${message.author.id}`)) {
      let süre = await db.fetch(`afk_süre_${message.author.id}`);
      let zaman = ms(Date.now() - süre);
      db.delete(`afk_${message.author.id}`);
      db.delete(`afk_süre_${message.author.id}`);
      message.member.setNickname(db.fetch(`afktag_${message.author.id}`))
      if(db.fetch(`dil_${message.guild.id}`) != "EN") {
      const afk_cikis = new Discord.RichEmbed()
        .setColor("ff0000")
        .setDescription(`<@${message.author.id}>  \`${zaman.hours}\` **saat**  \`${zaman.minutes}\` **dakika** \`${zaman.seconds}\` **saniye**dir AFK idin`)
      message.channel.send(afk_cikis)}
    }
  
    var kullanıcı = message.mentions.users.first();
    if (!kullanıcı) return;
    var sebep = await db.fetch(`afk_${kullanıcı.id}`);
  
    if (sebep) {
      let süre = await db.fetch(`afk_süre_${kullanıcı.id}`);
      let zaman = ms(Date.now() - süre);
      if(db.fetch(`dil_${message.guild.id}`) != "EN") {
      const afk_uyarı = new Discord.RichEmbed()
        .setColor("ff0000")
        .setDescription(`<@${kullanıcı.id}> adlı kullanıcı \`${sebep}\` sebebiyle; \`${zaman.hours}\` **saat**  \`${zaman.minutes}\` **dakika** \`${zaman.seconds}\` **saniyedir AFK!**`)
      message.reply(afk_uyarı)}
    }
  });
  
  /////////afk
  client.on("message" , async msg => {
    if(msg.content.startsWith(ayarlar.prefix+"afk")) return;
   
    let afk = msg.mentions.users.first()
   
    const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
   
    const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
   if(afk){
     const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
     const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
     if(msg.content.includes(kisi3)){
   
         msg.reply(`Etiketlediğiniz Kişi Afk \n Sebep : ${sebep}`)
     }
   }
    if(msg.author.id === kisi){
   
         msg.reply(`Hoşgeldin Dostum :oh_10: `)
    db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
    db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
    db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
     msg.member.setNickname(isim)
     
   }
   
  });

  /////caps engel

  client.on("message", async message => {
    var anahtar = db.fetch(`cpsengel_${message.guild.id}`);
    if (anahtar === "acik") {
      if (message.author.bot) return;
      if (message.content.length < 5) return;
      let capsengel = message.content.toUpperCase();
      let beyazliste =
        message.mentions.users.first() ||
        message.mentions.channels.first() ||
        message.mentions.roles.first();
  
      if (message.content == capsengel) {
        if (
          !beyazliste &&
          !message.content.includes("@everyone") &&
          !message.content.includes("@here") &&
          !message.member.hasPermission("BAN_MEMBERS")
        ) {
          message.delete();
          return message.channel
            .send("Büyük harf kullanmamalısın.!!!")
            .then(i => i.delete(10000));
        }
      }
    }
    if (!anahtar) return;
  });
  

//////küfür engel

client.on("message", async msg => {
    var anahtar = await db.fetch(`narcoskfurengel_${msg.guild.id}`);
    if (anahtar === "acik") {
      const küfürler = [
        "oç",
        "aq",
        "piç",
        "amk",
        "amq",
        "sik",
        "siktir",
        "orospu",
        "yarrak",
        "pezo",
        "orospu çocu"
         
      ]; 
  
      if (küfürler.some(küfür => msg.content.toLowerCase().includes(küfür))) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          msg.delete().then(msg.reply("Küfür etmek yasak lna :D"));
        }
      }
    }
    if (!anahtar) return;
  });

  ////reklam engel

  client.on("message", async msg => {
    var anahtar = await db.fetch(`narcosreklamengell_${msg.guild.id}`);
    if (anahtar === "acik") {
      const linkler = [
        "http",
        "https",
        ".com",
        ".net",
        ".xyz",
        ".tk",
        ".io",
        ".org",
        ".cf",
        ".ml",
        ".qa",
        ".club",
        ".gg",
        "discord.gg/"
      ];
      if (linkler.some(link => msg.content.includes(link))) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          msg.guild.owner.send("Sunucunuzda bir kişi reklam yaptı. \nKullanıcı: "+ msg.author.tag +" \nMesaj: **"+ msg +"** ");
          msg.delete().then(msg.reply("Reklam yapmak yasak dostum D:"))
         
        } 
      }
    }
    if (!anahtar) return;
  });





var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);