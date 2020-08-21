import { signUpByEmail, login, logout } from "../services/User/User.services";

const Mutation = {
  signUpByEmail,
  login,
  logout,
};

export default Mutation;
