// Copyright (©) 2020 NewCraft Corporation. All rights reserved. MIT License.

const Discord = require("discord.js");
const dir = "Servidores/Card/Carteiras";
const dir2 = "Servidores/Card/Cards";
var tc;

module.exports.run = async (client, message, args, database) => {
  if (message.author.id !== "390674797908197386") return;
  message.delete().catch(O_o => {});
  var sayMessage = args[1];
  if (sayMessage == null) return;

  var dbref = await database.ref(`${dir2}/${sayMessage}`).once('value');
      
  if (dbref.val() == null) {
    console.error('Erro:' + err);
    message.reply(` não existe esse comando, use **${config.pr}card help**`);
  return;
  };
  var list;
  let dbrefCarteira = database.ref(`${dir}/${message.author.id}`);
  dbrefCarteira.once('value').then(async function(db) {
    if (db.val() == null) {
      let embed = new Discord.MessageEmbed()
        .setTitle(`${message.author.tag}.`)
        .setDescription(`Você não tem uma Carteira!\n\nfaça uma usando: ts!card criarcarteira`);
      await message.channel.send(embed);
    } else {
      const b = db.val();
      if (!b.cards) {
        tc = 0;
      } else {
        tc = b.cards.length;
      }
      tc1 = tc + 1;
      if (tc == 0) {
        var list = [''];
        list[0] = `${sayMessage}`;
        dbrefCarteira.update({
          cards: list
        });

      } else {
        list = b.cards;
        list[tc] = `${sayMessage}`;
      
        dbrefCarteira.update({
          cards: list
        });
          
      };
    }
  });
};
