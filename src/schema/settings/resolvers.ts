/* eslint-disable import/no-unresolved */
import { QueryResolvers } from "../../types/types";

const Query: QueryResolvers.Resolvers = {};

// const Mutation: MutationResolvers.Resolvers = {
//   updateSettings: async (_, { updatedSettings }, { user, datasources }) => {
//     const filter = { userId: user._id };
//     datasources.settings.updateOne(filter, { ...updatedSettings });
//     // const settings = datasources.settings.findOne(filter);
//     const resetSettings = {
//       pushNotificationsEnabled: false,
//       shouldCompressPhotos: false,
//       shouldCompressVideos: false,
//       shouldUseDarkTheme: false,
//       geolocationEnabled: false,
//     };
//     return resetSettings;
//   },
//   resetSettings: async (_, __, { datasources, user }) => {
//     const resetSettings = {
//       pushNotificationsEnabled: false,
//       shouldCompressPhotos: false,
//       shouldCompressVideos: false,
//       shouldUseDarkTheme: false,
//       geolocationEnabled: false,
//     };
//     const filter = { userId: user._id };
//     await datasources.settings.updateOne(filter, resetSettings);
//     return resetSettings;
//   },
// };

// export const Mutation: MutationResolvers.Resolvers = {
//   resetSettings: () => {
//     const resetSettings = {
//       pushNotificationsEnabled: false,
//       shouldCompressPhotos: false,
//       shouldCompressVideos: false,
//       shouldUseDarkTheme: false,
//       geolocationEnabled: false,
//     };
//     return resetSettings;
//   },
// };

export default { Query };
