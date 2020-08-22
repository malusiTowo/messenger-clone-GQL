import mongoose, { Document } from "mongoose";

const { Schema } = mongoose;

export interface IMessage extends Document {
  content: string;
  // isReadByRecepient;
  sentTime: Date;
}

export const MessageSchema = new Schema(
  {
    content: { type: String },
    sentTime: {
      type: Date,
    },
  },
  {
    versionKey: false,
  },
);
