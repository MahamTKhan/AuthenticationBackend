const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userOTPVerification_model = require("../../models/OTP");

// Verify OTP
module.exports = router.post("/verify-OTP", async (req, res) => {
  try {
    const { userOTP, recipientEmail } = req.body;

    if (!userOTP || !recipientEmail) {
      return res.status(400).send("Empty fields are not allowed"); // Bad Request (400)
    }

    const userOTPVerificationRecord = await userOTPVerification_model.findOne({
      where: { email: recipientEmail }, // Use 'where' clause with Sequelize
    });
    if (!userOTPVerificationRecord) {
      return res.status(400).send("Invalid Email or OTP Already Verified"); // Bad Request (400)
    }
    else{
      console.log("OTP:",req.body);
    }

    const { expiresAt, otp: hashedOTP } = userOTPVerificationRecord;
    if (expiresAt < Date.now()) {
      await userOTPVerification_model.destroy({ where: { email: recipientEmail } }); // Use destroy instead of deleteMany
      return res.status(400).send("OTP Code Expired"); // Bad Request (400)
    }

    const validOTP = await bcrypt.compare(userOTP, hashedOTP); // Using bcrypt.compare to compare OTPs
    if (!validOTP) {
      return res.status(400).send("Invalid OTP Code"); // Bad Request (400)
    }

    await userOTPVerification_model.destroy({where:{ email: recipientEmail} });
    console.log("OTP Code Validated");
    res.status(200).send("OTP Verified Successfully"); // Success (200)
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).send("An error occurred while verifying the OTP"); // Internal Server Error (500)
  }
});
