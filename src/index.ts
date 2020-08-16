/* eslint-disable import/first */
// eslint-disable-next-line import/newline-after-import
require("dotenv").config();
import "../config/db";

import { ApolloServer, gql } from "apollo-server";
import fs from "fs";
import path from "path";

import resolvers from "./resolvers/index";
import context from "./middleware/context";

const typeDefs = gql(
  fs.readFileSync(path.join(__dirname, "schema.graphql"), { encoding: "utf8" }),
);

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  tracing: true,
  introspection: true,
  playground: true,
});

if (process.env.NODE_ENV !== "test") {
  server.listen({ port: PORT }).then(({ url }: { url: string }) => {
    console.log(`🚀 app running at ${url}`);
  });
}
