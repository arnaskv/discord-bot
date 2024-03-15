import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { jsonRoute } from '@/utils/middleware';
import BadRequest from '@/utils/errors/BadRequest';
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
  .get(
    jsonRoute(async (req) => {
      if (req.query.id) {
        const id = Number(req.query.id);

        if (!Number.isInteger(id)) {
          throw new BadRequest('id must be an integer');
        }

        return templates.getById(id);
      }

      return templates.findAll();
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

      return templates.remove(id);
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

      return templates.update(id, body);
    })
  );

export default router;
