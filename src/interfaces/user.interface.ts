export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export interface UserInput {
  name: string;
  email: string;
  password: string;
}
