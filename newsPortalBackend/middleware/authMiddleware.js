const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token, "<<<token");
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log("decoded", decoded);
      req.header = await User.findById(decoded.payload).select("-password");
      next();
    } catch (err) {
      console.log(err);
      res.status(401).json({
        success: false,
        msg: "Session Expired!",
      });
    }
  }

  if (!token) {
    res.status(401).json({
      success: false,
      msg: "Session Expired!",
    });
  }
};

module.exports = protect;
