import global from "./global/typeDefs";
import user from "./user/typeDefs";
import settings from "./settings/typeDefs";
import contacts from "./contacts/typeDefs";
import conversation from "./conversation/typeDefs";

const typeDefs = [...global, user, settings, contacts, conversation];

export default typeDefs;
