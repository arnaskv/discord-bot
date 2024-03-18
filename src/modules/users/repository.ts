import { Selectable } from 'kysely';
import db, { type User } from '@/database';
import { keys } from './schema';
import { toTitleCase } from '@/utils/utils';
import NotFound from '@/utils/errors/NotFound';

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

export function findAll(): Promise<RowSelect[]> {
  return db
    .selectFrom(TABLE)
    .select(keys)
    .execute()
    .then((users) => {
      if (!users) {
        throw new NotFound('No users exist');
      }
      return users;
    });
}

export function findByUsername(username: string): Promise<RowSelect> {
  return db
    .selectFrom('user')
    .select(keys)
    .where('username', '=', username)
    .executeTakeFirst()
    .then((user) => {
      if (!user) {
        throw new NotFound('User does not exist');
      }
      return user;
    });
}
