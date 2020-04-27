const nodemailer = require('nodemailer');

const user = "mdireynosa@gmail.com";
const pass = "ManDisInd";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: user,
    pass: pass
  }
})

module.exports.sendMail = (subject, text) => {
  return transporter.sendMail({
    from: user,
    to: user,
    subject: subject,
    text: text
  });
}