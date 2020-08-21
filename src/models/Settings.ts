import mongoose, { Document, Model } from "mongoose";

const { Schema } = mongoose;

interface ISettingsSchema extends Document {
  pushNotificationsEnabled?: Boolean;
  shouldCompressPhotos?: Boolean;
  shouldCompressVideos?: Boolean;
  shouldUseDarkTheme?: Boolean;
  geolocationEnabled?: Boolean;
  userId: String;
}

const settingsSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: new Date(),
    },
    updatedAt: {
      type: Date,
      default: new Date(),
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    pushNotificationsEnabled: {
      type: Boolean,
      default: false,
    },
    shouldCompressPhotos: {
      type: Boolean,
      default: false,
    },
    shouldCompressVideos: {
      type: Boolean,
      default: false,
    },
    shouldUseDarkTheme: {
      type: Boolean,
      default: false,
    },
    geolocationEnabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  },
);

export interface ISettings extends ISettingsSchema {}

interface ISettingsModel extends Model<ISettings> {}

export default mongoose.model<ISettingsSchema, ISettingsModel>(
  "Settings",
  settingsSchema,
);
