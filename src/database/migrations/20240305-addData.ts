import { Kysely, SqliteDialect } from 'kysely';

export async function up(db: Kysely<SqliteDialect>): Promise<void> {
  await db
    .insertInto('user')
    .values([
      {
        firstName: 'Arnas',
        lastName: 'Kvedaravicius',
        username: 'akveda',
      },
      {
        firstName: 'Kipras',
        lastName: 'Jankauskas',
        username: 'kjanka',
      },
      {
        firstName: 'Indre',
        lastName: 'Mockute',
        username: 'imocku',
      },
    ])
    .execute();

  await db
    .insertInto('sprint')
    .values([
      {
        sprintCode: 'WD-1.1',
        sprintInfo: 'First steps into programming with python',
      },
      {
        sprintCode: 'WD-1.2',
        sprintInfo: 'Intermediate programming with python',
      },
      {
        sprintCode: 'WD-1.3',
        sprintInfo: 'Object oriented programming',
      },
    ])
    .execute();

  await db.insertInto('template').values([
    {
      templateText:
        '{userInfo} congratulations on completing {sprintInfo}!\nYou are truly incredible!\n',
    },
    {
      templateText:
        '{userInfo} congratulations on completing {sprintInfo}!\nYou are the BEEEST!\n',
    },
    {
      templateText:
        '{userInfo} congratulations on completing {sprintInfo}!\nWe always knew you could do it :)\n',
    },
  ]);
}
