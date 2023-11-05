const { Client, Events, GatewayIntentBits, IntentsBitField } = require('discord.js');
const { token } = require('./config.json');
const { CommandHandler } = require("djs-commander");
const path = require("path");

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', () => {
    console.log(`${client.user.tag}에 로그인하였습니다!`);
});

new CommandHandler({
    client,
    commandsPath: path.join(__dirname, "commands"),
});

client.login(token);