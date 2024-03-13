import * as templates from '@/modules/templates/repository';
import * as sprints from '@/modules/sprints/repository';
import * as giphy from '@/giphy';
import * as discord from '@/discord/utility';

export async function createMessageText(username: string, sprintCode: string) {
  const sprintInfo = await sprints.getSprintInfo(sprintCode);
  const templateText = templates.getRandomTemplate();

  const messageText = templateText
    .replace('{userInfo}', username)
    .replace('{sprintInfo}', sprintInfo);

  return messageText;
}

export async function createEmbeddedGif(gifSearchWord: string) {
  const gif = await giphy.getGif(gifSearchWord);
  const embeddedGif = await discord.embedImg(gif);
  return embeddedGif;
}
