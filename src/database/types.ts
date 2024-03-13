import { ColumnType, Generated } from 'kysely';

export interface User {
  id: Generated<number>;
  firstName: string;
  lastName: string;
  username: string;
}

export interface Message {
  id: Generated<number>;
  userId: number;
  sprintId: number;
  templateId: number;
  createdAt: ColumnType<Date, string | undefined, never>;
}

export interface Sprint {
  id: Generated<number>;
  sprintCode: string;
  sprintInfo: string;
}

export interface Template {
  id: Generated<number>;
  templateText: string;
}

export interface DB {
  user: User;
  message: Message;
  sprint: Sprint;
  template: Template;
}
