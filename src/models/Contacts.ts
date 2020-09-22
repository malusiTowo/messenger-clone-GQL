import mongoose, { Document, Model, Types } from "mongoose";

const { Schema } = mongoose;

export enum ContactRequestStatus {
  PENDING_BY_RECEPIENT = 0,
  ACCEPTED = 1,
  BLOCKED = 2,
}

export enum OnlineStatus {
  ONLINE = 0,
  OFFLINE = 1,
}

interface IContactSchema extends Document {
  createdAt?: Date;
  updatedAt?: Date;
  userId: Types.ObjectId;
  friendId: Types.ObjectId;
  userStatus?: OnlineStatus;
  friendStatus?: OnlineStatus;
  userLastConnectionTime?: Date;
  friendLastConnectTime?: Date;
  requestStatus: ContactRequestStatus;
}

const ContactSchema = new Schema(
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
    },
    friendId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    userStatus: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    friendStatus: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    userLastConnectionTime: { type: Date },
    friendLastConnectTime: { type: Date },
    requestStatus: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
    },
    // user friend settings
  },
  {
    versionKey: false,
  },
);

export interface IContact extends IContactSchema {}

export interface IContactModel extends Model<IContact> {}

ContactSchema.pre<IContact>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<IContact, IContactModel>("contacts", ContactSchema);
