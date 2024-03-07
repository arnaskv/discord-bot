import { Client, EmbedBuilder, TextChannel } from 'discord.js';

export function getChannel(client: Client, channelId: string) {
  return client.channels.cache.get(channelId);
}

export async function embedImg(imgUrl: string) {
  return new EmbedBuilder().setImage(imgUrl);
}

export async function sendMessage(
  client: Client,
  channelId: string,
  messageText: string,
  embed: EmbedBuilder
) {
  const channel = client.channels.cache.get(channelId);

  if (!channel) {
    throw new Error('Channel with provided id does not exist');
  }
  if (!channel.isTextBased()) {
    throw new Error('Cannot send message to a non-text channel');
  }

  const textChannel = channel as TextChannel;
  await textChannel.send({ content: messageText, embeds: [embed] });
}
