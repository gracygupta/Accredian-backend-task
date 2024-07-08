const referralTemplate = require("../gmail_template/referral.template");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USERNAME,
    pass: process.env.NODEMAILER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Trust self-signed certificates
  },
});

transporter.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for message");
  }
});

// send otp
async function sendEmail(data) {
  const content = await referralTemplate(data);

  const mailOptions = {
    from: process.env.NODEMAILER_USERNAME,
    to: data.email,
    subject: "Course Referral Notification",
    html: content,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(
        "Error in config.js at sendVerificationEmail function",
        error
      );
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

module.exports = {
  sendEmail,
};
