import gql from "graphql-tag";

const typeDefs = gql`
  extend type Mutation {
    addFriend(friendId: ID!): Contact!
    removeFriend(friendId: ID!): Contact!
    acceptFriendRequest(id: ID!): Contact
  }

  extend type Query {
    userContacts: [Contact!]!
    userContact(id: ID!): Contact!
  }

  enum OnlineStatus {
    ONLINE
    OFFLINE
  }

  enum ContactRequestStatus {
    PENDING_BY_RECEPIENT
    ACCEPTED
    BLOCKED
  }

  type Contact {
    firstName: String!
    phone: String!
    status: OnlineStatus!
    lastConnection: String
    requestStatus: ContactRequestStatus!
  }
`;

export default typeDefs;
