import db from '@/database';
import { toTitleCase } from '@/utils/utils';

const TABLE = 'user';

export async function create(firstName: string, lastName: string) {
  const newUsername =
    firstName.toLowerCase().slice(0, 1) + lastName.toLowerCase().slice(0, 5);

  return db
    .insertInto(TABLE)
    .values({
      first_name: toTitleCase(firstName),
      last_name: toTitleCase(lastName),
      username: newUsername,
    })
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function findAll() {
  return db.selectFrom(TABLE).selectAll().execute();
}
