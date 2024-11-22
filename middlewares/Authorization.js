// const jwt = require("jsonwebtoken");

// const Authorization = async (req, res, next) => {
//   console.log("Authorzing Initiated");
//   let token = req.cookies.authToken;
//   if (!token) {
//     console.log("User not logged in.");
//     return res.status(401).send({ message: "You are not logged in." });
//   }
//   try {
//     let data = await jwt.verify(token, process.env.JWTPRIVATEKEY);
//     res.locals.id = data["_id"];
//     console.log(`Authorization granted to user ${data._id}`);
//     next();
//   } catch (err) {
//     return res.status(401).send({ message: "You are not logged in." });
//   }
// };

// module.exports = Authorization;

// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.cookies.authToken || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded; // I can access user data with req.user in  routes
    next();
  });
};

module.exports = authMiddleware;
