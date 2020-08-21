import gql from "graphql-tag";

const typeDefs = gql`
  extend type Query {
    me: String
  }

  extend type Mutation {
    login(email: String!, password: String!): AuthUser!
    logout(token: String!): String!
    signUpByEmail(data: signUpByEmailInput!): AuthUser!
  }

  type AuthUser {
    token: String!
    user: User
  }

  input signUpByEmailInput {
    email: String!
    password: String!
    phone: String!
    firstName: String!
    lastName: String!
  }

  type User {
    email: String!
    profileImage: String
    firstName: String!
    lastName: String!
    phone: String!
  }
`;

export default typeDefs;
