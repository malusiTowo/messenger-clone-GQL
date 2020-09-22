/* eslint-disable import/no-unresolved */
import { ApolloError } from "apollo-server";
import { QueryResolvers, MutationResolvers } from "../../types/types";

const Query: QueryResolvers.Resolvers = {
  getConversation: async (_, { id }, { datasources }) => {
    const conversation = datasources.conversation.findOne({ _id: id });

    if (!conversation) throw new ApolloError("No conversation found");
    return (await conversation).toObject();
  },
};

const Mutation: MutationResolvers.Resolvers = {
  createConversation: async (_, { data }, { datasources }) => {
    const conversation = await datasources.conversation.create(data);
    console.log("convo", conversation);
    return conversation.toObject();
  },
};

export default { Query, Mutation };
