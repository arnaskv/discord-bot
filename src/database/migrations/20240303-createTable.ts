import { Kysely, sql, SqliteDatabase } from 'kysely';

export async function up(db: Kysely<SqliteDatabase>): Promise<void> {
  await db.schema
    .createTable('user')
    .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
    .addColumn('first_name', 'text', (col) => col.notNull())
    .addColumn('last_name', 'text', (col) => col.notNull())
    .addColumn('username', 'text', (col) => col.notNull().unique())
    .execute();

  await db.schema
    .createTable('message')
    .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
    .addColumn('user_id', 'integer', (col) =>
      col.references('user.id').notNull()
    )
    .addColumn('sprint_id', 'integer', (col) =>
      col.references('sprint.id').notNull()
    )
    .addColumn('template_id', 'integer', (col) =>
      col.references('template.id').notNull()
    )
    .addColumn('gif_url', 'text', (col) => col.notNull())
    .addColumn('created_at', 'text', (col) =>
      col.defaultTo(sql`CURRENT_TIMESPAMP`).notNull()
    )
    .execute();

  await db.schema
    .createTable('sprint')
    .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
    .addColumn('sprint_code', 'text', (col) => col.notNull().unique())
    .addColumn('sprint_info', 'text', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('template')
    .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
    .addColumn('template_text', 'text')
    .execute();
}

export async function down(db: Kysely<SqliteDatabase>): Promise<void> {
  await db.schema.dropTable('user').execute();
  await db.schema.dropTable('message').execute();
  await db.schema.dropTable('sprint').execute();
  await db.schema.dropTable('template').execute();
}
