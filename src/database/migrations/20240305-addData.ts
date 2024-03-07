import { Kysely, SqliteDialect } from 'kysely';

export async function up(db: Kysely<SqliteDialect>): Promise<void> {
  await db
    .insertInto('user')
    .values([
      {
        first_name: 'Arnas',
        last_name: 'Kvedaravicius',
        username: 'akveda',
      },
      {
        first_name: 'Kipras',
        last_name: 'Jankauskas',
        username: 'kjanka',
      },
      {
        first_name: 'Indre',
        last_name: 'Mockute',
        username: 'imocku',
      },
    ])
    .execute();

  //   await db
  //     .insertInto('message')
  //     .values([
  //       {
  //         user,
  //       },
  //     ])
  //     .execute();
}
