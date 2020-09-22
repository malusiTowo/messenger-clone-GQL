import gql from "graphql-tag";

const typeDefs = gql`
  extend type Mutation {
    createConversation(data: createConversationInput!): Conversation!
    sendMessage(conversationId: ID!, newMessage: sendMessageInput!): Message!
    updateConversationSettings(
      conversationId: ID!
      updatedConvoSettings: updatedConvoSettings!
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
    id: ID!
    senderId: ID!
    messages: [Message!]!
    participants: [User!]!
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
