const express = require("express");
const users = require("../../models/users");
const { OTPsave } = require("../OTP_controllers/OTPsave");
const router = express.Router();

// Route to handle forgot password
router.post("/password/forgotpassword", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    if (email.length > 30) {
      return res.json({ status: "Email must be a valid email address." });
    }

    const oldUser = await users.findOne({ email });
    if (!oldUser) {
      console.log("Email Not Exists");
      return res.json({ status: "User Does Not Exist." });
    }

    await OTPsave({ recipientEmail: email });
    console.log("Sent to OTP verification.");
    res.json({ status: "Email sent for OTP verification", email });
  } catch (error) {
    console.error("Error sending recovery email:", error);
    res.status(500).send("Failed to send email.");
  }
});

module.exports = router;
