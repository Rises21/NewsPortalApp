import News from "../models/SavedNews.js";
import User from "../models/User.js";

export const getNews = async (req, res) => {
  //console.log(req.email, "????");
  try {
    const news = await User.findOne({ email: req.email });
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
    users.savedNews = await News.create({
      thumbnail,
      title,
      description,
      link,
      pubDate,
    });
    users.save();
    res.json({ user: users, msg: "savedNews Success." });
  } catch (err) {
    console.log(err);
  }
};
