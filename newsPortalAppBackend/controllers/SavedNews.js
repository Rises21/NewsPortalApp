import News from "../models/SavedNews.js";
import User from "../models/User.js";

export const getNews = async (req, res) => {
  console.log(req.email, "????");
  try {
    const user = await User.findOne({ email: req.email });
    console.log(user, "<<user<<");
    const news = await News.find({ user: user._id });
    res.status(200).json(news);
  } catch (err) {
    console.log(err.message);
  }
};

export const savedNews = async (req, res) => {
  const { thumbnail, title, description, link, pubDate } = req.body;
  if (!link) return res.status(404).json({ msg: "The news not found." });

  try {
    const users = await User.findOne({ email: req.email }).select(
      "-password -refresh_token"
    );
    const newss = await News.create({
      thumbnail,
      title,
      description,
      link,
      pubDate,
      user: users._id,
    });
    newss.save();
    res.json({ data: newss, msg: "savedNews Success." });
  } catch (err) {
    console.log(err);
  }
};
