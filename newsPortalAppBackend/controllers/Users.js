import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  //console.log(req.email, "????");
  try {
    const users = await User.findOne({ email: req.email })
      .populate({
        path: "newsSaved",
        select: "thumbnail title description link pubDate",
      })
      .select("-password -refresh_token");
    res.status(200).json(users);
  } catch (err) {
    console.log(err.message);
  }
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (password.length < 8)
    return res
      .status(400)
      .json({ msg: "Password is to short, minimum length is 8 character." });
  if (password.length > 20)
    return res
      .status(400)
      .json({ msg: "Password is to long, maximum length is 20 character." });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.json({ msg: "Register Success." });
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ msg: "Email already exist." });
    console.log(err);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong Password." });
    const userId = user._id,
      name = user.name,
      email = user.email;
    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" }
    );
    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    await User.findOneAndUpdate(
      { _id: userId },
      { refresh_token: refreshToken }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      domain: "localhost",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
    });
    res.status(200).json({ accessToken: accessToken, msg: "Login Success." });
  } catch (err) {
    res.status(404).json({ msg: "Email Not Found!" });
  }
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.sendStatus(204);
  const user = await User.findOne({
    refresh_token: refreshToken,
  });
  if (!user) return res.sendStatus(204);
  const userId = user._id;
  await User.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      refresh_token: null,
    }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    domain: "localhost",
    sameSite: "lax",
  });
  res.sendStatus(200);
};
