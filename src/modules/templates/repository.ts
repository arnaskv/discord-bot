import type { Insertable, Selectable, Updateable } from 'kysely';
import { sql } from 'kysely';
import { keys } from './schema';
import db, { Template } from '@/database';
import NotFound from '@/utils/errors/NotFound';

const TABLE = 'template';
type Row = Template;
type RowWithoutId = Omit<Row, 'id'>;
type RowInsert = Insertable<RowWithoutId>;
type RowUpdate = Updateable<RowWithoutId>;
type RowSelect = Selectable<Row>;

export function getRandomTemplate(): Promise<RowSelect> {
  return db
    .selectFrom(TABLE)
    .selectAll()
    .orderBy(sql`RANDOM()`)
    .limit(1)
    .executeTakeFirst()
    .then((template) => {
      if (!template) {
        throw new NotFound('No templates exist');
      }
      return template;
    });
}

export function findAll(): Promise<RowSelect[]> {
  return db
    .selectFrom(TABLE)
    .select(keys)
    .execute()
    .then((templates) => {
      if (!templates) {
        throw new NotFound('No templates exist');
      }
      return templates;
    });
}

export function findById(id: number): Promise<RowSelect> {
  return db
    .selectFrom(TABLE)
    .select(keys)
    .where('id', '=', id)
    .executeTakeFirst()
    .then((template) => {
      if (!template) {
        throw new NotFound('Template with id does not exist');
      }
      return template;
    });
}

export function create(insert: RowInsert): Promise<RowSelect | undefined> {
  return db.insertInto(TABLE).values(insert).returning(keys).executeTakeFirst();
}

export function remove(id: number) {
  return db
    .deleteFrom(TABLE)
    .where('id', '=', id)
    .executeTakeFirst()
    .then((template) => {
      if (!template) {
        throw new NotFound('Template with id does not exist');
      }
      return template;
    });
}

export function update(id: number, partial: RowUpdate): Promise<RowSelect> {
  return db
    .updateTable(TABLE)
    .set(partial)
    .where('id', '=', id)
    .returning(keys)
    .executeTakeFirst()
    .then((template) => {
      if (!template) {
        throw new NotFound('Template with id does not exist');
      }
      return template;
    });
}
