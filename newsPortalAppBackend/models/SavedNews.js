import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  thumbnail: String,
  title: String,
  description: String,
  link: String,
  pubDate: String,
});

const News = mongoose.model("News", newsSchema);

export default News;
