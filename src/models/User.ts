import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { Schema } = mongoose;

interface IUserSchema extends Document {
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  email: string;
  profileImage: string;
  tokens: [{ access: string; token: string }];
}

const UserSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: new Date(),
    },
    updatedAt: {
      type: Date,
      default: new Date(),
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    tokens: [
      {
        access: {
          type: String,
          required: true,
        },
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    versionKey: false,
  },
);

UserSchema.statics.findByCredentials = function (email: string, password: string) {
  const user = this;
  return user.findOne({ email }).then((foundUser: IUser) => {
    if (!foundUser) return Promise.reject(new Error("NO_USER_FOUND"));

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, foundUser.password, (_err, res) => {
        if (res) resolve(foundUser);
        else reject(new Error("Incorrect credentials"));
      });
    });
  });
};

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = "auth";
  const secret = process.env.JWT_SECRET || "";

  const token = jwt.sign({ _id: user._id.toHexString(), access }, secret).toString();

  user.tokens.push({
    access,
    token,
  });

  return user
    .save()
    .then(() => token)
    .catch((e: Error) => console.log(e));
};

UserSchema.statics.findByToken = function (token: string) {
  const user = this;
  let decoded = null;
  const secret = process.env.JWT_SECRET || "";

  try {
    decoded = Object(jwt.verify(token, secret));
  } catch (e) {
    console.log(e);
    return Promise.reject();
  }

  return user.findOne({
    _id: decoded?._id,
    "tokens.token": token,
    "tokens.access": "auth",
  });
};

UserSchema.methods.removeToken = async function (tokenToRemove: string) {
  const user = this;
  const tokens = user.tokens.filter(
    ({ token }: { token: string }) => token !== tokenToRemove,
  );

  await user.update({ tokens });
};

export interface IUser extends IUserSchema {
  generateAuthToken(): string;
  findByCredentials(email: string, password: string): Promise<IUser>;
  findByToken(token: string): Promise<IUser>;
  removeToken(token: string): Boolean;
}

interface IUserModel extends Model<IUser> {
  generateAuthToken(): string;
  findByCredentials(email: string, password: string): Promise<IUser>;
  findByToken(token: string): Promise<IUser>;
  removeToken(token: string): Boolean;
}

UserSchema.pre<IUser>("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, (_err, salt) => {
      bcrypt.hash(user.password, salt, (_error, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

export default mongoose.model<IUser, IUserModel>("User", UserSchema);
