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

  await db
    .insertInto('sprint')
    .values([
      {
        sprint_code: 'WD-1.1',
        sprint_info: 'First steps into programming with python',
      },
      {
        sprint_code: 'WD-1.2',
        sprint_info: 'Intermediate programming with python',
      },
      {
        sprint_code: 'WD-1.3',
        sprint_info: 'Object oriented programming',
      },
    ])
    .execute();

  await db
    .insertInto('template')
    .values([
      {
        template_text:
          '{userInfo} congratulations on completing {sprintInfo}!\nYou are truly incredible!\n',
      },
      {
        template_text:
          '{userInfo} congratulations on completing {sprintInfo}!\nYou are the BEEEST!\n',
      },
      {
        template_text:
          '{userInfo} congratulations on completing {sprintInfo}!\nWe always knew you could do it :)\n',
      },
    ])
    .execute();
}
