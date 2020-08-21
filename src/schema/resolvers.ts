import merge from "lodash/merge";

import user from "./user/resolvers";
import settings from "./settings/resolvers";

const resolvers = merge(user, settings);

export default resolvers;
