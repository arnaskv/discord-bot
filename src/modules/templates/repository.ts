import { sql } from 'kysely';
import db from '@/database';

const TABLE = 'template';

export async function create(templateText: string) {
  return db
    .insertInto(TABLE)
    .values({
      template_text: templateText,
    })
    .returningAll()
    .executeTakeFirst();
}

// export async function update() {}

export async function remove(id: number) {
  return db.deleteFrom(TABLE).where('id', '=', id).executeTakeFirst();
}

export async function getTemplate() {
  return db
    .selectFrom(TABLE)
    .select('template_text as templateText')
    .orderBy(sql`RANDOM()`)
    .limit(1)
    .executeTakeFirst()
    .then((template) => {
      if (!template) {
        throw new Error('No templates exist');
      }
      return template;
    });
}

export async function findAll() {
  return db.selectFrom(TABLE).selectAll().execute();
}
