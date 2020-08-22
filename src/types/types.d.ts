export type Maybe<T> = T | null;

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

// ====================================================
// Types
// ====================================================

export interface Query {
  userSettings: Settings;

  me?: Maybe<string>;
}

export interface Settings {
  pushNotificationsEnabled: boolean;

  shouldCompressPhotos: boolean;

  shouldCompressVideos: boolean;

  shouldUseDarkTheme: boolean;

  geolocationEnabled: boolean;
}

export interface Mutation {
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
    userSettings?: UserSettingsResolver<Settings, TypeParent, TContext>;

    me?: MeResolver<Maybe<string>, TypeParent, TContext>;
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
    updateSettings?: UpdateSettingsResolver<Settings, TypeParent, TContext>;

    resetSettings?: ResetSettingsResolver<Settings, TypeParent, TContext>;

    login?: LoginResolver<AuthUser, TypeParent, TContext>;

    logout?: LogoutResolver<string, TypeParent, TContext>;

    signUpByEmail?: SignUpByEmailResolver<AuthUser, TypeParent, TContext>;
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
