import 'dotenv/config';
import { Router, Response, Request } from 'express';
import { createMessageText, createEmbeddedGif } from './services';
import * as messages from './repository';
import * as discord from '@/discord/utility';
import client from '@/discord';

const { CHANNEL_ID } = process.env;

const router = Router();

router
  .route('/')
  .post(async (req: Request, res: Response) => {
    const { username } = req.body;
    const { sprintCode } = req.body;

    try {
      const messageText = await createMessageText(username, sprintCode);
      const embeddedGif = await createEmbeddedGif('congratulations');

      if (!CHANNEL_ID) {
        throw new Error('Provide channel id in enviromental variables');
      }

      discord.sendMessage(client, CHANNEL_ID, messageText, embeddedGif);

      res.status(200).end();
    } catch (error) {
      res.json({ error });
    }
  })
  .get(async (req: Request, res: Response) => {
    const allMessages = await messages.findAll();
    res.json(allMessages);
  });

// router.route('/:username').get(async (req: Request, res: Response) => {
//   const { username } = req.params.username;
//   res.json(messages.getMessagesByUser(username));
// });

// router.route('/:sprint').get();

export default router;
