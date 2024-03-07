import { ColumnType, Generated } from 'kysely';

export interface User {
  id: Generated<number>;
  first_name: string;
  last_name: string;
  username: string;
}

export interface Message {
  id: Generated<number>;
  user_id: number;
  sprint_id: number;
  template_id: number;
  created_at: ColumnType<Date, string | undefined, never>;
}

export interface Sprint {
  id: Generated<number>;
  sprintCode: string;
  sprintInfo: string;
}

export interface Template {
  id: Generated<number>;
  template_text: string;
}

export interface DB {
  user: User;
  message: Message;
  sprint: Sprint;
  template: Template;
}
