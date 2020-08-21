import { Express } from "express";
import { ApolloServer } from "apollo-server-express";

export default (app: Express, { schema, context }) => {
  const graphql = new ApolloServer({
    schema,
    context,
    // engine: {
    //   apiKey: process.env.ENGINE_API_KEY,
    // },
    introspection: true,
  });

  app.get("/", (_, res) => {
    res.redirect(graphql.graphqlPath);
  });

  graphql.applyMiddleware({
    app,
  });
};
