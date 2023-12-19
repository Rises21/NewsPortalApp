import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    thumbnail: String,
    title: String,
    description: String,
    link: String,
    pubDate: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const News = mongoose.model("News", newsSchema);

export default News;
