import gql from "graphql-tag";

const typeDefs = gql`
  extend type Mutation {
    sendMessage(id: ID!, newMessage: sendMessageInput!): Message!
    createConversation(data: createConversationInput!): Conversation!
    updateConversationSettings(
      updatedConvoSettings: updateConversationSettings!
    ): Conversation!
  }

  extend type Query {
    getConversation(id: ID!): Conversation!
  }

  type Message {
    content: String!
    sentTime: String!
  }

  type Conversation {
    senderId: ID!
    messages: [Message!]!
    participants: [ID!]!
    conversationName: String
  }

  input sendMessageInput {
    content: String!
    sentTime: String
  }

  input createConversationInput {
    participants: [ID!]!
    conversationName: String
  }

  input updatedConvoSettings {
    conversationName: String!
  }
`;

export default typeDefs;
