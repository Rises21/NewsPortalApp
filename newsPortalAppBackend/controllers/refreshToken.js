import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    //console.log(refreshToken, "<<<refreshtoken>");
    if (!refreshToken) return res.sendStatus(401);
    const user = await User.find({
      refresh_token: refreshToken,
    });
    if (!user[0]) return res.sendStatus(403);
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const secretAccess = process.env.ACCESS_TOKEN_SECRET;

    jwt.verify(refreshToken, secret, (err, decoded) => {
      console.log(decoded, "this is decoded");
      if (err) {
        return res.sendStatus(403);
      }
      const userId = user[0]._id,
        name = user[0].name,
        email = user[0].email;

      const accessToken = jwt.sign({ userId, name, email }, secretAccess, {
        expiresIn: "900s",
      });
      res.json({ accessToken });
    });
  } catch (error) {
    console.log(error, "?????");
  }
};
