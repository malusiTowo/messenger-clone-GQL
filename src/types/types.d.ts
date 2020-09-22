export type Maybe<T> = T | null;

export interface CreateConversationInput {
  participants: string[];

  conversationName?: Maybe<string>;
}

export interface SendMessageInput {
  content: string;

  sentTime?: Maybe<string>;
}

export interface UpdatedConvoSettings {
  conversationName: string;
}

export interface UpdatedSettingsInput {
  pushNotificationsEnabled?: Maybe<boolean>;

  shouldCompressPhotos?: Maybe<boolean>;

  shouldCompressVideos?: Maybe<boolean>;

  shouldUseDarkTheme?: Maybe<boolean>;

  geolocationEnabled?: Maybe<boolean>;
}

export interface SignUpByEmailInput {
  email: string;

  password: string;

  phone: string;

  firstName: string;

  lastName: string;
}

export enum OnlineStatus {
  Online = "ONLINE",
  Offline = "OFFLINE",
}

export enum ContactRequestStatus {
  PendingByRecepient = "PENDING_BY_RECEPIENT",
  Accepted = "ACCEPTED",
  Blocked = "BLOCKED",
}

// ====================================================
// Types
// ====================================================

export interface Query {
  userContacts: Contact[];

  userContact: Contact;

  getConversation: Conversation;

  userSettings: Settings;

  me?: Maybe<string>;
}

export interface Contact {
  name: string;

  phone: string;

  status: OnlineStatus;

  lastConnection?: Maybe<string>;

  requestStatus: ContactRequestStatus;
}

export interface Conversation {
  id: string;

  senderId: string;

  messages: Message[];

  participants: string[];

  conversationName?: Maybe<string>;
}

export interface Message {
  content: string;

  sentTime: string;
}

export interface Settings {
  pushNotificationsEnabled: boolean;

  shouldCompressPhotos: boolean;

  shouldCompressVideos: boolean;

  shouldUseDarkTheme: boolean;

  geolocationEnabled: boolean;
}

export interface Mutation {
  addFriend: Contact;

  removeFriend: Contact;

  acceptFriendRequest?: Maybe<Contact>;

  createConversation: Conversation;

  sendMessage: Message;

  updateConversationSettings: Conversation;

  updateSettings: Settings;

  resetSettings: Settings;

  login: AuthUser;

  logout: string;

  signUpByEmail: AuthUser;
}

export interface AuthUser {
  token: string;

  user?: Maybe<User>;
}

export interface User {
  email: string;

  profileImage?: Maybe<string>;

  firstName: string;

  lastName: string;

  phone: string;
}

// ====================================================
// Arguments
// ====================================================

export interface UserContactQueryArgs {
  id: string;
}
export interface GetConversationQueryArgs {
  id: string;
}
export interface AddFriendMutationArgs {
  friendId: string;
}
export interface RemoveFriendMutationArgs {
  friendId: string;
}
export interface AcceptFriendRequestMutationArgs {
  id: string;
}
export interface CreateConversationMutationArgs {
  data: CreateConversationInput;
}
export interface SendMessageMutationArgs {
  conversationId: string;

  newMessage: SendMessageInput;
}
export interface UpdateConversationSettingsMutationArgs {
  conversationId: string;

  updatedConvoSettings: UpdatedConvoSettings;
}
export interface UpdateSettingsMutationArgs {
  updatedSettings: UpdatedSettingsInput;
}
export interface LoginMutationArgs {
  email: string;

  password: string;
}
export interface LogoutMutationArgs {
  token: string;
}
export interface SignUpByEmailMutationArgs {
  data: SignUpByEmailInput;
}

import { GraphQLResolveInfo } from "graphql";

import { Context } from "./context";

export type Resolver<Result, Parent = {}, TContext = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, TContext, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo,
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo,
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<Result, Parent = {}, TContext = {}, Args = {}> =
  | ((...args: any[]) => ISubscriptionResolverObject<Result, Parent, TContext, Args>)
  | ISubscriptionResolverObject<Result, Parent, TContext, Args>;

export type TypeResolveFn<Types, Parent = {}, TContext = {}> = (
  parent: Parent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export namespace QueryResolvers {
  export interface Resolvers<TContext = Context, TypeParent = {}> {
    userContacts?: UserContactsResolver<Contact[], TypeParent, TContext>;

    userContact?: UserContactResolver<Contact, TypeParent, TContext>;

    getConversation?: GetConversationResolver<Conversation, TypeParent, TContext>;

    userSettings?: UserSettingsResolver<Settings, TypeParent, TContext>;

    me?: MeResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type UserContactsResolver<
    R = Contact[],
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type UserContactResolver<
    R = Contact,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext, UserContactArgs>;
  export interface UserContactArgs {
    id: string;
  }

  export type GetConversationResolver<
    R = Conversation,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext, GetConversationArgs>;
  export interface GetConversationArgs {
    id: string;
  }

  export type UserSettingsResolver<
    R = Settings,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type MeResolver<R = Maybe<string>, Parent = {}, TContext = Context> = Resolver<
    R,
    Parent,
    TContext
  >;
}

export namespace ContactResolvers {
  export interface Resolvers<TContext = Context, TypeParent = Contact> {
    name?: NameResolver<string, TypeParent, TContext>;

    phone?: PhoneResolver<string, TypeParent, TContext>;

    status?: StatusResolver<OnlineStatus, TypeParent, TContext>;

    lastConnection?: LastConnectionResolver<Maybe<string>, TypeParent, TContext>;

    requestStatus?: RequestStatusResolver<ContactRequestStatus, TypeParent, TContext>;
  }

  export type NameResolver<R = string, Parent = Contact, TContext = Context> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type PhoneResolver<R = string, Parent = Contact, TContext = Context> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type StatusResolver<
    R = OnlineStatus,
    Parent = Contact,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type LastConnectionResolver<
    R = Maybe<string>,
    Parent = Contact,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type RequestStatusResolver<
    R = ContactRequestStatus,
    Parent = Contact,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
}

export namespace ConversationResolvers {
  export interface Resolvers<TContext = Context, TypeParent = Conversation> {
    id?: IdResolver<string, TypeParent, TContext>;

    senderId?: SenderIdResolver<string, TypeParent, TContext>;

    messages?: MessagesResolver<Message[], TypeParent, TContext>;

    participants?: ParticipantsResolver<string[], TypeParent, TContext>;

    conversationName?: ConversationNameResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type IdResolver<
    R = string,
    Parent = Conversation,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type SenderIdResolver<
    R = string,
    Parent = Conversation,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type MessagesResolver<
    R = Message[],
    Parent = Conversation,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type ParticipantsResolver<
    R = string[],
    Parent = Conversation,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type ConversationNameResolver<
    R = Maybe<string>,
    Parent = Conversation,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
}

export namespace MessageResolvers {
  export interface Resolvers<TContext = Context, TypeParent = Message> {
    content?: ContentResolver<string, TypeParent, TContext>;

    sentTime?: SentTimeResolver<string, TypeParent, TContext>;
  }

  export type ContentResolver<
    R = string,
    Parent = Message,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type SentTimeResolver<
    R = string,
    Parent = Message,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
}

export namespace SettingsResolvers {
  export interface Resolvers<TContext = Context, TypeParent = Settings> {
    pushNotificationsEnabled?: PushNotificationsEnabledResolver<
      boolean,
      TypeParent,
      TContext
    >;

    shouldCompressPhotos?: ShouldCompressPhotosResolver<boolean, TypeParent, TContext>;

    shouldCompressVideos?: ShouldCompressVideosResolver<boolean, TypeParent, TContext>;

    shouldUseDarkTheme?: ShouldUseDarkThemeResolver<boolean, TypeParent, TContext>;

    geolocationEnabled?: GeolocationEnabledResolver<boolean, TypeParent, TContext>;
  }

  export type PushNotificationsEnabledResolver<
    R = boolean,
    Parent = Settings,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type ShouldCompressPhotosResolver<
    R = boolean,
    Parent = Settings,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type ShouldCompressVideosResolver<
    R = boolean,
    Parent = Settings,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type ShouldUseDarkThemeResolver<
    R = boolean,
    Parent = Settings,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type GeolocationEnabledResolver<
    R = boolean,
    Parent = Settings,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
}

export namespace MutationResolvers {
  export interface Resolvers<TContext = Context, TypeParent = {}> {
    addFriend?: AddFriendResolver<Contact, TypeParent, TContext>;

    removeFriend?: RemoveFriendResolver<Contact, TypeParent, TContext>;

    acceptFriendRequest?: AcceptFriendRequestResolver<
      Maybe<Contact>,
      TypeParent,
      TContext
    >;

    createConversation?: CreateConversationResolver<Conversation, TypeParent, TContext>;

    sendMessage?: SendMessageResolver<Message, TypeParent, TContext>;

    updateConversationSettings?: UpdateConversationSettingsResolver<
      Conversation,
      TypeParent,
      TContext
    >;

    updateSettings?: UpdateSettingsResolver<Settings, TypeParent, TContext>;

    resetSettings?: ResetSettingsResolver<Settings, TypeParent, TContext>;

    login?: LoginResolver<AuthUser, TypeParent, TContext>;

    logout?: LogoutResolver<string, TypeParent, TContext>;

    signUpByEmail?: SignUpByEmailResolver<AuthUser, TypeParent, TContext>;
  }

  export type AddFriendResolver<R = Contact, Parent = {}, TContext = Context> = Resolver<
    R,
    Parent,
    TContext,
    AddFriendArgs
  >;
  export interface AddFriendArgs {
    friendId: string;
  }

  export type RemoveFriendResolver<
    R = Contact,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext, RemoveFriendArgs>;
  export interface RemoveFriendArgs {
    friendId: string;
  }

  export type AcceptFriendRequestResolver<
    R = Maybe<Contact>,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext, AcceptFriendRequestArgs>;
  export interface AcceptFriendRequestArgs {
    id: string;
  }

  export type CreateConversationResolver<
    R = Conversation,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext, CreateConversationArgs>;
  export interface CreateConversationArgs {
    data: CreateConversationInput;
  }

  export type SendMessageResolver<
    R = Message,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext, SendMessageArgs>;
  export interface SendMessageArgs {
    conversationId: string;

    newMessage: SendMessageInput;
  }

  export type UpdateConversationSettingsResolver<
    R = Conversation,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext, UpdateConversationSettingsArgs>;
  export interface UpdateConversationSettingsArgs {
    conversationId: string;

    updatedConvoSettings: UpdatedConvoSettings;
  }

  export type UpdateSettingsResolver<
    R = Settings,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext, UpdateSettingsArgs>;
  export interface UpdateSettingsArgs {
    updatedSettings: UpdatedSettingsInput;
  }

  export type ResetSettingsResolver<
    R = Settings,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type LoginResolver<R = AuthUser, Parent = {}, TContext = Context> = Resolver<
    R,
    Parent,
    TContext,
    LoginArgs
  >;
  export interface LoginArgs {
    email: string;

    password: string;
  }

  export type LogoutResolver<R = string, Parent = {}, TContext = Context> = Resolver<
    R,
    Parent,
    TContext,
    LogoutArgs
  >;
  export interface LogoutArgs {
    token: string;
  }

  export type SignUpByEmailResolver<
    R = AuthUser,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext, SignUpByEmailArgs>;
  export interface SignUpByEmailArgs {
    data: SignUpByEmailInput;
  }
}

export namespace AuthUserResolvers {
  export interface Resolvers<TContext = Context, TypeParent = AuthUser> {
    token?: TokenResolver<string, TypeParent, TContext>;

    user?: UserResolver<Maybe<User>, TypeParent, TContext>;
  }

  export type TokenResolver<R = string, Parent = AuthUser, TContext = Context> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type UserResolver<
    R = Maybe<User>,
    Parent = AuthUser,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
}

export namespace UserResolvers {
  export interface Resolvers<TContext = Context, TypeParent = User> {
    email?: EmailResolver<string, TypeParent, TContext>;

    profileImage?: ProfileImageResolver<Maybe<string>, TypeParent, TContext>;

    firstName?: FirstNameResolver<string, TypeParent, TContext>;

    lastName?: LastNameResolver<string, TypeParent, TContext>;

    phone?: PhoneResolver<string, TypeParent, TContext>;
  }

  export type EmailResolver<R = string, Parent = User, TContext = Context> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type ProfileImageResolver<
    R = Maybe<string>,
    Parent = User,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type FirstNameResolver<R = string, Parent = User, TContext = Context> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type LastNameResolver<R = string, Parent = User, TContext = Context> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type PhoneResolver<R = string, Parent = User, TContext = Context> = Resolver<
    R,
    Parent,
    TContext
  >;
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  Context
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  Context
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  Context
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string;
}

export type IResolvers<TContext = Context> = {
  Query?: QueryResolvers.Resolvers<TContext>;
  Contact?: ContactResolvers.Resolvers<TContext>;
  Conversation?: ConversationResolvers.Resolvers<TContext>;
  Message?: MessageResolvers.Resolvers<TContext>;
  Settings?: SettingsResolvers.Resolvers<TContext>;
  Mutation?: MutationResolvers.Resolvers<TContext>;
  AuthUser?: AuthUserResolvers.Resolvers<TContext>;
  User?: UserResolvers.Resolvers<TContext>;
} & { [typeName: string]: never };

export type IDirectiveResolvers<Result> = {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
} & { [directiveName: string]: never };
