import * as users from '@/modules/users/repository';
import * as templates from '@/modules/templates/repository';
import * as sprints from '@/modules/sprints/repository';
import * as discord from '@/discord/utility';

export async function formMessage(username: string, sprintCode: string) {
  const user = await users.getUserBy(username);
  const userInfo = `${user.firstName} ${user.lastName} | ${user.username}`;

  const sprint = await sprints.getSprintBySprintCode(sprintCode);
  const template = await templates.getRandomTemplate();

  return {
    userId: user.id,
    sprintId: sprint.id,
    templateId: template.id,
    messageText: template.templateText
      .replace('{userInfo}', userInfo)
      .replace('{sprintInfo}', sprint.sprintInfo),
  };
}

export async function embedGif(gifUrl: string) {
  return discord.embedImg(gifUrl);
}
