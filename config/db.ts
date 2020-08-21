import mongoose from "mongoose";

mongoose.Promise = global.Promise;

(async () => {
  const URI = process.env.MONGODB_URI || "";
  try {
    mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log("Error connecting to database", err);
  }
})();

export default mongoose;
