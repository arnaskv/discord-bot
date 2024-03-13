import z from 'zod';
import type { Message } from '@/database';

type Record = Message;
const schema = z.object({
  id: z.coerce.number().int().positive(),
  userId: z.number().int().positive(),
  sprintId: z.number().int().positive(),
  templateId: z.number().int().positive(),
  gifUrl: z.string().min(1).max(500),
  createdAt: z.date(),
});

const insertable = schema.omit({
  id: true,
  createdAt: true,
});

const updateable = schema
  .omit({
    id: true,
    userId: true,
    createdAt: true,
  })
  .partial();

export const parseId = (id: unknown) => schema.shape.id.parse(id);
export const parse = (record: unknown) => schema.parse(record);
export const parseInsertable = (record: unknown) => insertable.parse(record);
export const parseUpdateable = (record: unknown) => updateable.parse(record);

export const keys: (keyof Record)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[];
