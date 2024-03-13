import type { Insertable, Selectable, Updateable } from 'kysely';
import { keys } from './schema';
import db from '@/database';

const TABLE = 'message';
type Row = Message;
type RowWithoutId = Omit<Row, 'id'>;
type RowRelationshipsIds = Pick<Row, 'userId'>;
type RowInsert = Insertable<RowWithoutId>;
type RowUpdate = Updateable<RowWithoutId>;
type RowSelect = Selectable<Row>;

export function findAll(): Promise<RowSelect[] | undefined> {
  return db.selectFrom(TABLE).select(keys).execute();
}

export function create(data: RowInsert): Promise<RowSelect | undefined> {
  return db.insertInto(TABLE).values(data).returning(keys).executeTakeFirst();
}

export async function getMessagesByUsername(username: string) {
  return db
    .selectFrom(TABLE)
    .innerJoin('user', 'user.id', `${TABLE}.userId`)
    .where('user.username', '==', username)
    .execute();
}

export function getMessagesBySprintId(sprintId: number) {
  return db
    .selectFrom(TABLE)
    .innerJoin('sprint', 'sprint.id', `${TABLE}.userId`)
    .where('sprint.id', '==', sprintId)
    .execute();
}
