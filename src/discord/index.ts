import 'dotenv/config';
import { Client, Events, GatewayIntentBits } from 'discord.js';

const { DISCORD_BOT_TOKEN } = process.env;

if (!DISCORD_BOT_TOKEN) {
  throw new Error('Provide discord bot token in enviromental variables.');
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  // eslint-disable-next-line no-console
  console.log(`Discord bot ready! Logged in as ${readyClient.user.tag}`);
});

client.login(DISCORD_BOT_TOKEN);

export default client;
