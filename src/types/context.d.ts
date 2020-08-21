import { IUser } from "../models/User";
import datasources from "../models";

export type Context = {
  datasources: typeof datasources;
  user: IUser;
  token: string;
};
