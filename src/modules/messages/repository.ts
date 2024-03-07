import type {
  ExpressionOrFactory,
  Insertable,
  Selectable,
  SqlBool,
  Updateable,
} from 'kysely';
import db from '@/database';

const TABLE = 'message';
// type Row = Message;
// type RowWithoutId = Omit<Row, 'id'>;
// type RowRelationshipsIds = Pick<Row, 'userId'>;
// type RowInsert = Insertable<RowWithoutId>;
// type RowUpdate = Updateable<RowWithoutId>;
// type RowSelect = Selectable<Row>;

export async function create(username: string, sprintCode: string) {}

export function findAll() {
  return 'All messages';
}

// export function findAll(): Promise<RowSelect[]> {
//   return db.selectFrom(TABLE).selectAll().execute();
// }

export async function getMessagesByUser(username: string) {
  const messages = await db
    .selectFrom(TABLE)
    .innerJoin('user', 'user.id', `${TABLE}.user_id`)
    .where('user.username', '==', username)
    .execute();
  return messages;
}

export function getMessagesBySprint(sprintId: number) {}
