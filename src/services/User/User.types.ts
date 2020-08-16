import { IUser } from "../../models/User";

export type signUpByEmailInput = {
  email: IUser["email"];
  password: IUser["password"];
  phone: IUser["phone"];
  firstName: IUser["firstName"];
  lastName: IUser["lastName"];
};

export type loginInput = {
  email: string;
  password: string;
};

export type logoutInput = {
  token: string;
};
