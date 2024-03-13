import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as templates from './repository';
import { jsonRoute } from '@/utils/middleware';
import { parseInsertable } from './schema';

const router = Router();

router
  .route('/')
  .post(
    jsonRoute(async (req) => {
      const body = parseInsertable(req.body);

      return templates.create(body);
    }, StatusCodes.CREATED)
  )
  .get(jsonRoute(async () => templates.findAll()));

export default router;
