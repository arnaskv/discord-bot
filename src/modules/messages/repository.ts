import type { Insertable, Selectable } from 'kysely';
import { keys } from './schema';
import db, { Message } from '@/database';
import NotFound from '@/utils/errors/NotFound';

const TABLE = 'message';
type Row = Message;
type RowWithoutId = Omit<Row, 'id'>;
type RowInsert = Insertable<RowWithoutId>;
type RowSelect = Selectable<Row>;

export function findAll(): Promise<RowSelect[]> {
  return db
    .selectFrom(TABLE)
    .select(keys)
    .execute()
    .then((messages) => {
      if (!messages) {
        throw new NotFound('No messages exist');
      }
      return messages;
    });
}

export function create(data: RowInsert): Promise<RowSelect | undefined> {
  return db.insertInto(TABLE).values(data).returning(keys).executeTakeFirst();
}

export function findByUsername(username: string): Promise<RowSelect[]> {
  return db
    .selectFrom(TABLE)
    .selectAll(TABLE)
    .innerJoin('user', 'user.id', `${TABLE}.userId`)
    .where('user.username', '=', username)
    .execute()
    .then((messages) => {
      if (!messages) {
        throw new NotFound('User has no messages');
      }
      return messages;
    });
}

export function findBySprintCode(sprintCode: string) {
  return db
    .selectFrom(TABLE)
    .selectAll(TABLE)
    .innerJoin('sprint', 'sprint.id', `${TABLE}.sprintId`)
    .where('sprint.sprintCode', '=', sprintCode)
    .execute()
    .then((messages) => {
      if (!messages) {
        throw new NotFound('Sprint has no messages');
      }
      return messages;
    });
}
