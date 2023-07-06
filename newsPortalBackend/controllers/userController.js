const User = require("../models/userModel");
var mailer = require("../utils/Mailer");
const generateToken = require("../utils/generateToken");
const crypto = require("crypto");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists && userExists.active) {
      return res.status(400).json({
        success: false,
        msg: "Email is already registered , please login to continue or signup for free",
      });
    } else if (userExists && !userExists.active) {
      return res.status(400).json({
        success: false,
        msg: "please activate your account, check your email!",
      });
    }

    const user = new User({
      name,
      email,
      password,
    });

    //code to send mail
    //generate 20 bit activation code, crypto is built in from nodejs
    crypto.randomBytes(20, (err, buf) => {
      //ensure the activation link is unique
      user.activeToken = user._id + buf.toString("hex");
      //set expiration time 24 hours
      user.activeExpires = Date.now() + 24 + 3600 + 1000;
      let link =
        process.env.NODE_ENV === "development"
          ? `http://localhost:${process.env.PORT}/api/users/active/${user.activeToken}`
          : `${process.env.API_HOST}/api/users/active/${user.activeToken}`;

      //sending activation email
      mailer.send({
        to: req.body.email,
        subject: "Welcome !",
        html: "Please click  this link " + link + " to activate your account.",
      });

      //save user object
      user.save();
      if (err) return next(err);
      res.status(201).json({
        success: true,
        msg:
          "The activation email has been sent to " +
          user.email +
          ", please check and click that link.",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "Server having some issues.",
    });
  }
};

const activeToken = async (req, res, next) => {
  try {
    //find coorresponding user
    const user = await User.findOne({
      activeToken: req.params.activeToken,
      // activeExpires: { $gt: Date.now() },
    });

    console.log(user);
    //if invalid activation code
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "Your activation link is invalid!",
      });
    }

    if (user.active === true) {
      return res.status(200).json({
        success: true,
        msg: "Your already activated, go login to use this app.",
      });
    } else if (user.active === false) {
      //if not activated, activate and save
      user.active = true;
      user.save();
      return res.json({
        success: true,
        msg: "Activation success.",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log(user, "<<<<<from authUser");
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).json({
      success: false,
      msg: "Unauthorized user!",
    });
  }
};

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.header._id);
  console.log(user, "<<<user");
  if (user) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  } else {
    res.status(404).json({
      success: false,
      msg: "User NOTFOUND!",
    });
  }
};

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.header._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.avatar = req.body.avatar || user.avatar;

    const updateUser = await user.save();

    res.json({
      _id: updateUser.id,
      name: updateUser.name,
      email: updateUser.email,
      avatar: updateUser.avatar,
      token: generateToken(user._id),
    });
  } else {
    return res.status(404).json({
      success: false,
      msg: "User NOTFOUND!",
    });
  }
};

module.exports = {
  registerUser,
  activeToken,
  authUser,
  getUserProfile,
  updateUserProfile,
};
