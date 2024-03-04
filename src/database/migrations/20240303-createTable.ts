import { Kysely, sql, SqliteDatabase } from "kysely";

export async function up(db: Kysely<SqliteDatabase>): Promise<void> {
    await db.schema
        .createTable('user')
        .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
        .addColumn('username', 'text', (col) => col.notNull().unique())
        .execute()

    await db.schema
        .createTable('post')
        .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
        .addColumn('user_id', 'integer', (col) => col.notNull())
        .addColumn('content', 'text', (col) => col.notNull())
        .addColumn('created_at', 'text', (col) => col.defaultTo(sql`CURRENT_TIMESPAMP`).notNull())
        .execute()
}

export async function down(db: Kysely<SqliteDatabase>): Promise<void> {
    await db.schema.dropTable('user').execute()
    await db.schema.dropTable('posts').execute()
}