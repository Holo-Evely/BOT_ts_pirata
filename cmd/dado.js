// Copyright (©) 2020 NewCraft Corporation. All rights reserved. MIT License.

const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  const sayM = args.join(' ');
  dado6 = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
  message.reply(`:game_die: **${dado6}** :game_die:`);
};
