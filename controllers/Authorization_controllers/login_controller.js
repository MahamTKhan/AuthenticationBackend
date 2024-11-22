const authRouter = require("express").Router();
const  users = require("../../models/users.js"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 
const {validate} = require("../../validators/loginvalidation.js")
//----------------------------------------------------



// Login Route
authRouter.post("/login", async (req, res) => {
    console.log("login route hit");
    try {
        console.log("Received data:", req.body);
        const { error } = validate(req.body);

        if (error) return res.status(400).send({ message: error.details[0].message });
        console.log("checking login data...")
        const user = await users.findOne({ where: { email: req.body.email } });

        console.log("checking user active status...")
        if (!user || user.isActiveUser === false) {
            return res.status(401).send({ message: "Invalid Email or Password." });
        }
        
        console.log("credential verification...")
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid Email or Password." });
        }
        
        // Generate JWT token         
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.status(200).send({ data: token, message: "Log In Successful." });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server Error." });
    }
});



module.exports = authRouter;


























//---------------------------
// // Login Route
// router.post("/", async (req, res) => {
//   try {
//     console.log("Received data:", req.body);

//     // Check if the user exists
//     const user = await users.findOne({ where: { email: req.body.email } });

//     // Check if user is found and is active
//     if (!user || user.isActiveUser === false) {
//       return res.status(401).send({ message: "Invalid Email or Password." });
//     }

//     // Validate the password
//     const validPassword = await bcrypt.compare(req.body.password, user.password);
//     if (!validPassword) {
//       return res.status(401).send({ message: "Invalid Email or Password." });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     // Set the cookie with the JWT token
//     res.cookie('authToken', token, {
//       httpOnly: true, // Prevents JavaScript access
//       secure: process.env.NODE_ENV === 'production', // Only use HTTPS in production
//       sameSite: 'strict', // Prevent CSRF attacks
//     });

//     res.status(200).send({ data: token, message: "Log In Successful." });
//   } catch (error) {
//     console.error(error); // Log the error
//     res.status(500).send({ message: "Internal Server Error." });
//   }
// });

// module.exports = router;
