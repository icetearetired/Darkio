require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const mongoose = require('mongoose');
const eventHandler = require('./handlers/eventHandler');

const token = process.env.TOKEN
const mongo_uri = process.env.MONGODB_URI


const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
     IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.MessageContent,
  ],
});

(async () => {
  try {
    mongoose.set('strictQuery', false);
    console.log('Mongo URI:', mongo_uri);
    await mongoose.createConnection(mongo_uri);
    console.log('Connected to DB.');

    eventHandler(client);

    client.login(token);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();

