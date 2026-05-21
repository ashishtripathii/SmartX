const mongoose = require("mongoose");
const { sendMail } = require("../utils/sendMail");
const { otpEmailTemplate } = require("../templates/otpEmailTemplate");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },

  otp: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

const sendOtp = async (email, otp) => {
  await sendMail(email, "OTP Verification", otpEmailTemplate(otp));
};

otpSchema.pre("save", async function (next) {
  await sendOtp(this.email, this.otp);
  next();
});

module.exports = mongoose.model("OTP", otpSchema);
