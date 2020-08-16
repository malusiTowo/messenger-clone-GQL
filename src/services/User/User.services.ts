import { UserInputError, ApolloError } from "apollo-server";

import { signUpByEmailInput, loginInput, logoutInput } from "./User.types";
import { validateEmail, validatePassword } from "../../utils/validation";
import User from "../../models/User";

export const login = async function (_: {}, { email, password }: loginInput) {
  let token = null;
  if (!validateEmail(email)) throw new UserInputError("Email provided is invalid");
  else if (!validatePassword(password))
    throw new UserInputError("Password provided is invalid");

  try {
    const user = await User.findByCredentials(email, password);
    token = user.generateAuthToken();
  } catch (err) {
    console.log(err);
    if (err.message === "NO_USER_FOUND")
      throw new ApolloError("No user found with those credentials");
    throw new ApolloError("An Error occured during the operation", err);
  }
  return token;
};

export const logout = async function (_: {}, { token }: logoutInput) {
  try {
    const user = await User.findByToken(token);
    if (!user) throw new ApolloError("NO_USER_FOUND_BY_TOKEN");
    user.removeToken(token);
  } catch (err) {
    console.log(err);
    if (err.message === "NO_USER_FOUND_BY_TOKEN")
      throw new ApolloError("No user found by token");
    throw new ApolloError("Unable to complete operation");
  }

  return "User Logged out";
};

export const signUpByEmail = async function (
  _: {},
  { data }: { data: signUpByEmailInput },
) {
  const { email, password } = data;
  let token = null;

  if (!validateEmail(email)) throw new UserInputError("Email provided is invalid");
  else if (!validatePassword(password))
    throw new UserInputError("Password provided is invalid");

  try {
    const user = new User(data);
    await user.save();
    token = user.generateAuthToken();
  } catch (err) {
    console.log(err);
    throw new ApolloError("An Error occured during the operation", err);
  }

  return token;
};
