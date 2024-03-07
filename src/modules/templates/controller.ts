import { Router, Request, Response } from 'express';
import * as templates from './repository';

const router = Router();

router
  .route('/')
  .post(async (req: Request, res: Response) => {
    try {
      const { templateText } = req.body;

      const newTemplate = await templates.create(templateText);
      res.json(newTemplate);
    } catch (error) {
      res.json({ error });
    }
  })
  .get(async (req: Request, res: Response) => {
    res.json(await templates.findAll());
  });

export default router;
