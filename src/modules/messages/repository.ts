import type { Insertable, Selectable, Updateable } from 'kysely';
import { keys } from './schema';
import db, { Message } from '@/database';

const TABLE = 'message';
type Row = Message;
type RowWithoutId = Omit<Row, 'id'>;
type RowInsert = Insertable<RowWithoutId>;
type RowUpdate = Updateable<RowWithoutId>;
type RowSelect = Selectable<Row>;

export function findAll(): Promise<RowSelect[] | undefined> {
  return db.selectFrom(TABLE).select(keys).execute();
}

export function create(data: RowInsert): Promise<RowSelect | undefined> {
  return db.insertInto(TABLE).values(data).returning(keys).executeTakeFirst();
}

export function findByUsername(username: string) {
  return db
    .selectFrom(TABLE)
    .selectAll(TABLE)
    .innerJoin('user', 'user.id', `${TABLE}.userId`)
    .where('user.username', '=', username)
    .execute();
}

export function findBySprintCode(sprintCode: string) {
  return db
    .selectFrom(TABLE)
    .selectAll(TABLE)
    .innerJoin('sprint', 'sprint.id', `${TABLE}.sprintId`)
    .where('sprint.sprintCode', '=', sprintCode)
    .execute();
}
