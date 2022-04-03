//mail configuration

const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e31d6a5a4ddb20",
    pass: "c8e39e99ce3dff"
  }
});