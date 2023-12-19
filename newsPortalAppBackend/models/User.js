import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refresh_token: String,
  },
  { timestamps: true }
);

userSchema.virtual("newsSaved", {
  ref: "News",
  localField: "_id",
  foreignField: "user",
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

const User = mongoose.model("User", userSchema);

export default User;
