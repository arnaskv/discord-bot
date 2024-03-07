import type { Insertable, Selectable, Updateable } from 'kysely';
import { keys } from './schema';
import db, { type Sprint } from '@/database';

const TABLE = 'sprint';
type Row = Sprint;
type RowWithoutId = Omit<Row, 'id'>;
type RowInsert = Insertable<RowWithoutId>;
type RowUpdate = Updateable<RowWithoutId>;
type RowSelect = Selectable<Row>;

export async function getSprintInfo(
  sprintCode: string
): Promise<RowSelect | undefined> {
  return db
    .selectFrom(TABLE)
    .select(keys)
    .where('sprintCode', '=', sprintCode)
    .executeTakeFirst();
}

export async function create(data: RowInsert): Promise<RowSelect | undefined> {
  return db.insertInto(TABLE).values(data).returning(keys).executeTakeFirst();
}

export async function findById(id: number): Promise<RowSelect | undefined> {
  return db
    .selectFrom(TABLE)
    .select(keys)
    .where('id', '=', id)
    .executeTakeFirst();
}

export async function update(
  id: number,
  partial: RowUpdate
): Promise<RowSelect | undefined> {
  if (Object.keys(partial).length === 0) {
    return findById(id);
  }

  return db
    .updateTable(TABLE)
    .set(partial)
    .where('id', '=', id)
    .returning(keys)
    .executeTakeFirst();
}

export async function remove(id: number) {
  return db
    .deleteFrom(TABLE)
    .where('id', '=', id)
    .returning(keys)
    .executeTakeFirst();
}
