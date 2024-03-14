import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { jsonRoute } from '@/utils/middleware';
import * as users from './repository';

const router = Router();

router
  .route('/')
  .post(
    jsonRoute(async (req) => {
      const { firstName } = req.body;
      const { lastName } = req.body;

      if (!firstName || !lastName) {
        throw new Error('Provide first and last name');
      }

      const newUser = await users.create(firstName, lastName);
      return newUser;
    }, StatusCodes.CREATED)
  )
  .get(jsonRoute(async () => users.findAll()));

export default router;
