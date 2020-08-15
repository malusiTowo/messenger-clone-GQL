import resolvers from './resolvers/index';
import context from './middleware/context';

require('dotenv').config();

const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const path = require('path');

const typeDefs = gql(fs.readFileSync(path.join(__dirname, 'schema.graphql'), { encoding: 'utf8' }));

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  tracing: true,
  introspection: true,
  playground: true,
});

if (process.env.NODE_ENV !== 'test') {
  server.listen({ port: PORT }).then(({ url }: { url: string }) => {
    console.log(`🚀 app running at ${url}`);
  });
}
