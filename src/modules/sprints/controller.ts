import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { jsonRoute } from '@/utils/middleware';
import * as sprints from './repository';
import * as schema from './schema';
import BadRequest from '@/utils/errors/BadRequest';

const router = Router();

router
  .route('/')
  .post(
    jsonRoute(async (req) => {
      const body = schema.parseInsertable(req.body);

      return sprints.create(body);
    }, StatusCodes.CREATED)
  )
  .get(
    jsonRoute(async (req) => {
      if (!req.query.id) {
        throw new BadRequest('Provide id');
      }

      const id = Number(req.query.id);

      if (!Number.isInteger(id)) {
        throw new Error('Id must be an integer');
      }

      return sprints.findById(id);
    })
  )
  .patch(
    jsonRoute(async (req) => {
      if (!req.query.id) {
        throw new BadRequest('Provide id');
      }
      const id = Number(req.query.id);

      if (!Number.isInteger(id)) {
        throw new BadRequest('Id must be an integer');
      }

      const body = schema.parsePartial(req.body);
      return sprints.update(id, body);
    })
  )
  .delete(
    jsonRoute(async (req) => {
      if (!req.query.id) {
        throw new BadRequest('Provide id');
      }
      const id = Number(req.query.id);

      if (!Number.isInteger(id)) {
        throw new BadRequest('Id must be an integer');
      }

      return sprints.remove(id);
    })
  );

export default router;
