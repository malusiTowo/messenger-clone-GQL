/* eslint-disable import/no-unresolved */
import { ApolloError } from "apollo-server";
import { QueryResolvers, MutationResolvers } from "../../types/types";
import { ContactRequestStatus } from "../../models/Contacts";
// import { authenticated } from "../../middleware/auth";

const Query: QueryResolvers.Resolvers = {
  userContacts: async (_, __, { datasources, user }) => {
    let friends = [];
    const friendsReqByUser = await datasources.contacts.find(
      {
        userId: user._id,
      },
      "friendId",
    );
    const friendsReqByUserIds = friendsReqByUser.map(({ friendId }) => friendId);
    console.log("friendsReqByUser", friendsReqByUserIds);
    const friendsSentToUser = await datasources.contacts.find(
      { friendId: user._id },
      "userId",
    );
    const friendsSentToUserIds = friendsSentToUser.map(({ userId }) => userId);

    console.log("friendsSentToUser", friendsSentToUserIds);
    friends = [...friendsReqByUserIds, ...friendsSentToUserIds];
    console.log("friends", friends);
    const contacts = await datasources.user.find({
      _id: {
        $in: friends,
      },
    });
    console.log("contacts", contacts);
    return user.toObject();
  },
  // userContact: async (_, { id }, { datasources, user }) => {},
};

const Mutation: MutationResolvers.Resolvers = {
  addFriend: async (_, { friendId }, { datasources, user }) => {
    const friend = await datasources.user.findOne({ _id: friendId });

    if (!friend) throw new ApolloError("No user found with that id");

    const existingFriendShip = await datasources.contacts.find({
      $or: [
        {
          userId: user._id,
          friendId: friend._id,
        },
        {
          userId: friend._id,
          friendId: user._id,
        },
      ],
    });

    if (existingFriendShip.length > 0)
      throw new ApolloError("Friend request already made");

    const contactInfo = {
      userId: user._id,
      friendId: friend._id,
      requestStatus: ContactRequestStatus.PENDING_BY_RECEPIENT,
    };
    await datasources.contacts.create(contactInfo);

    return friend.toObject();
  },
  acceptFriendRequest: async (_, { id }, { datasources }) => {
    const contact = await datasources.contacts.findOneAndUpdate(
      { _id: id },
      { requestStatus: ContactRequestStatus.ACCEPTED },
      { new: true },
    );

    const friend = await datasources.contacts.findOne({ _id: contact.friendId });

    return friend.toObject();
  },
};

export default { Query, Mutation };
