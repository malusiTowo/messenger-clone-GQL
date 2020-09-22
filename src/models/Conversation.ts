import mongoose, { Document, Model, Types } from "mongoose";
import { IMessage, MessageSchema } from "./Message";

const { Schema } = mongoose;

interface IConversationSchema extends Document {
  id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  // senderId: string;
  messages?: Types.Array<IMessage>;
  participants: Types.Array<string>;
  conversationName?: string;
}

const ConversationSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: new Date(),
    },
    updatedAt: {
      type: Date,
      default: new Date(),
    },
    // senderId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user",
    // },
    messages: {
      type: [MessageSchema],
      default: [],
    },
    participants: [
      {
        type: String,
      },
    ],
    conversationName: {
      type: String,
    },
  },
  {
    versionKey: false,
  },
);

export interface IConversation extends IConversationSchema {}

export interface IConversationModel extends Model<IConversation> {}

ConversationSchema.pre<IConversation>("save", function (next) {
  const conversation = this;
  conversation.updatedAt = new Date();
  next();
});

export default mongoose.model<IConversation, IConversationModel>(
  "conversation",
  ConversationSchema,
);
