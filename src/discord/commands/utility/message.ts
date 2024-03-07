import { Channel, TextChannel } from 'discord.js';

export async function sendMessage(channel: Channel, message: string) {
  if (!channel.isTextBased()) {
    throw new Error('Cannot send message to a non-text channel');
  }

  const textChannel = channel as TextChannel;
  await textChannel.send(message);
}
