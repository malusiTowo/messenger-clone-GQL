/* eslint-disable import/no-unresolved */
import { UserInputError, ApolloError } from "apollo-server-express";
import { QueryResolvers, MutationResolvers } from "../../types/types";
import { IUser } from "../../models/User";
import { validateEmail, validatePassword } from "../../utils/validation";

export const Query: QueryResolvers.Resolvers = {
  me: () => "Hello World",
};

export const Mutation: MutationResolvers.Resolvers = {
  login: async (_, { email, password }, { datasources: { user: User } }) => {
    const authUser: { token: string; user: IUser | null } = { token: "", user: null };
    if (!validateEmail(email)) throw new UserInputError("Email provided is invalid");
    else if (!validatePassword(password))
      throw new UserInputError("Password provided is invalid");

    try {
      const user = await User.findByCredentials(email, password);
      authUser.token = user.generateAuthToken();
      authUser.user = user;
    } catch (err) {
      console.log(err);
      if (err.message === "NO_USER_FOUND")
        throw new ApolloError("No user found with those credentials");
      throw new ApolloError("An Error occured during the operation", err);
    }
    return authUser;
  },
  logout: async (_, { token }, { user, datasources }) => {
    if (user) datasources.user.removeToken(token);
    else throw new ApolloError("Unable to find user by token");
    return "User Logged out";
  },
  signUpByEmail: async (_, { data }, { datasources }) => {
    const authUser: { token: string; user: IUser | null } = { token: "", user: null };
    const { email, password } = data;

    if (!validateEmail(email)) throw new UserInputError("Email provided is invalid");
    else if (!validatePassword(password))
      throw new UserInputError("Password provided is invalid");

    try {
      const user = await datasources.user.create(data);
      await datasources.settings.create({ userId: user._id });
      authUser.user = user;
      authUser.token = user.generateAuthToken();
    } catch (err) {
      console.log(err);
      throw new ApolloError("An Error occured during the operation", err);
    }

    return authUser;
  },
};

export default { Query, Mutation };
