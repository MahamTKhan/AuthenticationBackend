const authRouter = require("express").Router();
const users = require("../../models/users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validate } = require("../../validators/signupvalidation.js");

authRouter.post("/signup", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const { error } = validate(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    if (req.body.password !== req.body.Confirmpassword) {
      console.log("password matching...");
      return res.status(400).send({ message: "Passwords do not match." });
    }

    const user = await users.findOne({ where: { email: req.body.email } });
    
    if (user) {
      console.log("checking if user already signed up or not");
      
      if (user.isActiveUser) {
        return res.status(409).send({ message: "User with given email already exists." });
      } else {
        // If the user exists but was previously deactivated, reactivate the user
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await users.update(
          { password: hashPassword, isActiveUser: true },
          { where: { email: req.body.email } }
        );

        return res.status(200).send({ message: "User reactivated successfully." });
      }
    }

    // If the user does not exist, create a new user
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await users.create({
      ...req.body,
      password: hashPassword,
      isActiveUser: true,
    });

    return res.status(201).send({ message: "User created successfully." });
    
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error." });
  }
});

module.exports = authRouter;
