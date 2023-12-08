var _ = require("lodash");

const nodemailer = require("nodemailer");

var config = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "erguernolimit@gmail.com",
    pass: process.env.APP_PASS,
  },
};

var tranporter = nodemailer.createTransport(config);

var defaultMail = {
  from: "erguernolimit@gmail.com",
  text: "test test test",
};

const send = (to, subject, html) => {
  //use default setting
  mail = _.merge({ html }, defaultMail, to);
  tranporter.sendMail(mail, (err, info) => {
    if (err) return console.log(err);
    console.log("Mail Sent", info.response);
  });
};

module.exports = {
  send,
};
