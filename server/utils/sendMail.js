const nodeMailer = require("nodemailer");

exports.sendMail = async (email, subject, body) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false, // true if port 465
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"SoilX" <${process.env.MAIL_USER}>`,
      to: email,
      subject: subject,
      html: body,
    });

    return info;
  } catch (error) {
    console.log("Error occurred during sending mail:", error);
    throw error; // important so controller catches it
  }
};