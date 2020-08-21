import { AuthenticationError } from "apollo-server";
import { IContext } from "./context";

export const authenticated = (
  next: (arg0: any, arg1: any, arg2: any, arg3: any) => any,
) => (root: any, args: any, context: IContext, info: any) => {
  if (!context.user) throw new AuthenticationError("must authenticate");

  return next(root, args, context, info);
};

export const authorized = (
  role: any,
  next: (arg0: any, arg1: any, arg2: any, arg3: any) => any,
) => (root: any, args: any, context: { user: { role: any } }, info: any) => {
  if (context.user.role !== role)
    throw new AuthenticationError(`you must have ${role} role`);

  return next(root, args, context, info);
};
