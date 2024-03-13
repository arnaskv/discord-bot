import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { jsonRoute } from '@/utils/middleware';
import * as sprints from './repository';
import * as schema from './schema';

const router = Router();

router.route('/').post(
  jsonRoute(async (req) => {
    const body = schema.parseInsertable(req.body);

    return sprints.create(body);
  }, StatusCodes.CREATED)
);

export default router;
