import { Selectable } from 'kysely';
import db, { type User } from '@/database';
import { keys } from './schema';
import { toTitleCase } from '@/utils/utils';

const TABLE = 'user';
type Row = User;
type RowSelect = Selectable<Row>;

export function create(
  firstName: string,
  lastName: string
): Promise<RowSelect | undefined> {
  const newUsername =
    firstName.toLowerCase().slice(0, 1) + lastName.toLowerCase().slice(0, 5);

  return db
    .insertInto(TABLE)
    .values({
      firstName: toTitleCase(firstName),
      lastName: toTitleCase(lastName),
      username: newUsername,
    })
    .returning(keys)
    .executeTakeFirstOrThrow();
}

export function findAll(): Promise<RowSelect[] | undefined> {
  return db.selectFrom(TABLE).select(keys).execute();
}

export function findByUsername(
  username: string
): Promise<RowSelect | undefined> {
  return db
    .selectFrom('user')
    .select(keys)
    .where('username', '=', username)
    .executeTakeFirst();
}
