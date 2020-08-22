import { makeExecutableSchema, IResolvers } from "apollo-server-express";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers as IResolvers,
});

export default schema;
