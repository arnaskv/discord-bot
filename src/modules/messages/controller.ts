import 'dotenv/config';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { jsonRoute } from '@/utils/middleware';
import { formMessage, embedGif } from './services';
import * as messages from './repository';
import * as discord from '@/discord/utility';
import client from '@/discord';
import * as giphy from '@/giphy';

const { CHANNEL_ID } = process.env;

const router = Router();

router
  .route('/')
  .post(
    jsonRoute(async (req) => {
      const { username } = req.body;
      const { sprintCode } = req.body;

      const { userId, sprintId, templateId, messageText } = await formMessage(
        username,
        sprintCode
      );
      const gifUrl = await giphy.getGif('congratulations');
      const embeddedGif = await embedGif(gifUrl);

      if (!CHANNEL_ID) {
        throw new Error('Provide channel id in enviromental variables');
      }

      discord.sendMessage(client, CHANNEL_ID, messageText, embeddedGif);

      return messages.create({ userId, sprintId, templateId, gifUrl });
    }, StatusCodes.CREATED)
  )
  .get(jsonRoute(async () => messages.findAll()));

// router.route('/:username').get(async (req: Request, res: Response) => {
//   const { username } = req.params.username;
//   res.json(messages.getMessagesByUser(username));
// });

// router.route('/:sprint').get();

export default router;
