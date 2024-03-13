import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { jsonRoute } from '@/utils/middleware';
import * as templates from './repository';
import * as schema from './schema';

const router = Router();

router
  .route('/')
  .post(
    jsonRoute(async (req) => {
      const body = schema.parseInsertable(req.body);

      return templates.create(body);
    }, StatusCodes.CREATED)
  )
  .get(jsonRoute(async () => templates.findAll()));

export default router;
