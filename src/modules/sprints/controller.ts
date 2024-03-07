import { Router, Request, Response } from 'express';
import * as sprints from './repository';
import * as schema from './schema';

const router = Router();

router.route('/').post(async (req: Request, res: Response) => {
  try {
    const body = schema.parseInsertable(req.body);

    const result = await sprints.create(body);
    res.json(result);
  } catch (error) {
    res.json({ error });
  }
});

export default router;
