const router = require("express").Router();
const { users } = require("../models/users"); // Ensure this is the correct import for your User model
const bcrypt = require("bcrypt");
// Uncomment if you have validation logic
 const { validate } = require("../../validators/signupvalidation"); 

// Signup Route
router.post("/auth/signup", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    
    const { error } = validate(req.body);
    
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    // Check if the password & confirm password are the same
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match." });
    }

    // Check if the user email already exists in the database
    const user = await users.findOne({ where: { email: req.body.email } }); // Ensure you're using the correct ORM method
    if (user) {
      if (user.isActiveUser) {
        return res.status(409).send({ message: "User with given email already exists." });
      } else {
        // Update the inactive user
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        await users.update(
          { password: hashPassword, isActiveUser: true },
          { where: { email: req.body.email } } // Adjust this according to your ORM
        );
        return res.status(200).send({ message: "User reactivated successfully." });
      }
    } 

    // Create a new user if no user with the given email exists
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await users.create({
      ...req.body,
      password: hashPassword,
      isActiveUser: true,
    });

    return res.status(201).send({ message: "User created successfully." });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).send({ message: "Internal Server Error." });
  }
});

module.exports = router;
