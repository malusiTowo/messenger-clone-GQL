import gql from "graphql-tag";

const typeDefs = gql`
  extend type Mutation {
    updateSettings(updatedSettings: updatedSettingsInput!): Settings
    resetSettings: Settings
  }

  input updatedSettingsInput {
    pushNotificationsEnabled: Boolean
    shouldCompressPhotos: Boolean
    shouldCompressVideos: Boolean
    shouldUseDarkTheme: Boolean
    geolocationEnabled: Boolean
  }

  type Settings {
    pushNotificationsEnabled: Boolean!
    shouldCompressPhotos: Boolean!
    shouldCompressVideos: Boolean!
    shouldUseDarkTheme: Boolean!
    geolocationEnabled: Boolean!
  }
`;

export default typeDefs;
