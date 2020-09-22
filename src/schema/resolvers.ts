import merge from "lodash/merge";

import user from "./user/resolvers";
import settings from "./settings/resolvers";
import contacts from "./contacts/resolvers";
import conversation from "./conversation/resolvers";

const resolvers = merge(user, settings, contacts, conversation);

export default resolvers;
