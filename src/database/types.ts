import { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely"

export interface DB {
    user: UserTable
    post: PostTable
}

export interface UserTable {
    id: Generated<number>
    username: string
}

export interface PostTable {
    id: Generated<number>
    user_id: number
    content: string
    created_at: ColumnType<Date, string | undefined, never>
}
