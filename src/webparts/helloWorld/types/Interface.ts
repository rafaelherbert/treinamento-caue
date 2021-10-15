export interface ITask {
  Id: number;
  Title: string;
  Done: boolean;
  Description: string;
  AuthorId: number;
}

export interface ICreateTask {
  Title: string;
  Description: string;
  Done?: boolean;
}
