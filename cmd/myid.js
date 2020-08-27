// Copyright (©) 2020 NewCraft Corporation. All rights reserved. MIT License.

const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    const id = (message.author.id);
    message.reply(`seu ID: ${id}`)
}
