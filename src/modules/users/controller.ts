import { Router, Request, Response } from 'express';
import * as users from './repository';

const router = Router();

router.route('/').post(async (req: Request, res: Response) => {
  try {
    const { firstName } = req.body;
    const { lastName } = req.body;

    if (!firstName || !lastName) {
      throw new Error('Provide first and last names.');
    }

    const newUser = await users.create(firstName, lastName);
    res.json(newUser);
  } catch (error) {
    res.json({ error });
  }
});

export default router;
