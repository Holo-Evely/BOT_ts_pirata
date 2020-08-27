// Copyright (©) 2020 NewCraft Corporation. All rights reserved. MIT License.

const Discord = require("discord.js");
const setMembros = new Set();

exports.run = async function(client, message, args, database, ops){
    
  for (var i = 0; i < message.guild.members.cache.size; i++) {

    let membro = message.guild.members.cache.map(m => m.user.id).slice(i, i+1);

    let dbMembro = await database.ref(`Servidores/Levels/${message.guild.id}/${membro}`).once('value');
        
    if (dbMembro.val() !== null) {
      let idMembro = message.guild.members.cache.map(m => m.user.id).slice(i, i+1);

      let infoMembro = {
        id: `${idMembro}`, level: dbMembro.val().level
      };
      setMembros.add(infoMembro);
    }
  }

  let pe = Array.from(setMembros);
    
  let xy = pe.sort(function (a, b) {
    if (a.level < b.level) {
      return 1;
    }
    if (a.level > b.level) {
      return -1;
    }
    return 0;
  });
    
  let x = [];
  if (xy.length >= 10) {
    for (y = 0; y < 10; y++) {
      let level = xy.slice(y, y+1).map(a => a.level);
      let id = String(xy.slice(y, y+1).map(a => a.id));
      x += `**${y+1}**. ${client.users.cache.get(id).tag} [Level: ${level}].\n`
    }
  } else {
    for (y = 0; y < xy.length; y++) {
      let level = xy.slice(y, y+1).map(a => a.level);
      let id = String(xy.slice(y, y+1).map(a => a.id));
      x += `**${y+1}**. ${client.users.cache.get(id).tag} [Level: ${level}].\n`
    }
  }

  const embed = new Discord.MessageEmbed()
    .setTitle(`RANKING DA BURRICE DO  ${message.guild.name}`)
    .setThumbnail(message.guild.iconURL())
    .setDescription(`${x}`)
    .setColor("#2f3136")
  message.channel.send(embed);
  setMembros.clear();
}