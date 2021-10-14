export interface ITask {
  Id: number;
  Title: string;
  Done: boolean;
  Description: string;
}

export interface ICreateTask {
  Title: string;
  Description: string;
}
