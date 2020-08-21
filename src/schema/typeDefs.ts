import global from "./global/typeDefs";
import user from "./user/typeDefs";
import settings from "./settings/typeDefs";

const typeDefs = [...global, user, settings];

export default typeDefs;
