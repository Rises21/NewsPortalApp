import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  refresh_token: String,
  savedNews: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "News",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
