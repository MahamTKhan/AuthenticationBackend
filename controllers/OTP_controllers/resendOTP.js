const express = require("express");
const router = express.Router();
const { OTPsave } = require("./OTPsave");

// Resend OTP
router.post("/resend-OTP", async (req, res) => {
  try {
    const { recipientEmail } = req.body;

    if (!recipientEmail) {
      console.log("Resend route hit")
      return res.status(404).send("An Error Occured, Email Not Found.");
    }

    await OTPsave({ recipientEmail });
    return res.send({ message: "OTP Resent successfully." });
  } catch (error) {
    console.error("Error resending OTP:", error);
    res.status(500).send({ message: "Internal Server Error." });
  }
});

module.exports = router;
