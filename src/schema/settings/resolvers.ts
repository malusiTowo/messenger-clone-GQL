/* eslint-disable import/no-unresolved */
import { authenticated } from "../../middleware/auth";
import { MutationResolvers, QueryResolvers } from "../../types/types";

const Query: QueryResolvers.Resolvers = {
  userSettings: authenticated(async (_, __, { user, datasources }) => {
    const filter = { userId: user._id };
    const settings = datasources.settings.findOne(filter);
    return (await settings).toObject();
  }),
};

const Mutation: MutationResolvers.Resolvers = {
  updateSettings: authenticated(async (_, { updatedSettings }, { user, datasources }) => {
    const filter = { userId: user._id };
    await datasources.settings.updateOne(filter, { ...updatedSettings });
    const settings = datasources.settings.findOne(filter);
    return (await settings).toObject();
  }),
  resetSettings: authenticated(async (_, __, { datasources, user }) => {
    const resetSettings = {
      pushNotificationsEnabled: false,
      shouldCompressPhotos: false,
      shouldCompressVideos: false,
      shouldUseDarkTheme: false,
      geolocationEnabled: false,
    };
    const filter = { userId: user._id };
    await datasources.settings.updateOne(filter, resetSettings);
    return resetSettings;
  }),
};

export default { Query, Mutation };
