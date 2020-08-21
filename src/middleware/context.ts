import User, { IUser } from "../models/User";
import datasources from "../models/index";

export interface IContext {
  user: IUser;
  token: String;
  datasources: typeof datasources;
}

type Request = {
  req: {
    headers: {
      authorization: string;
    };
  };
};

const context = async ({ req }: Request) => {
  const token = req.headers.authorization || "";
  const user = await User.findByToken(token);

  return { user, token, datasources };
};

export default context;
