const linkedinrouter = require('express').Router();
const passport = require('passport');
const bcrypt = require("bcrypt");
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const session = require('express-session');
const linkedinuser=require('../../models/linkedinusers');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// Session configuration
linkedinrouter.use(session({
  secret: process.env.SESSION_SECRET,  // Use a securely generated session secret
  resave: false,
  saveUninitialized: true
}));

linkedinrouter.use(passport.initialize());
linkedinrouter.use(passport.session());

// LinkedIn Strategy setup
console.log("Checking...");
passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/api/users/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_liteprofile'],
  state: true
},


async (accessToken, refreshToken, profile, done) => {
  try {
    console.log("finding user")
    // Check if user already exists in the database
    let user = await linkedinuser.findOne({ linkedinId: profile.id });
    console.log("user found")
    if (!user) {
      ("user not found, registering user")
      // If user doesn't exist, create a new user
      user = new linkedinuser({
        linkedinId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      });
      await user.save();
      console.log("user saved to db")
    }

    return done(null, user);

  } catch (err) {
    console.log("Error in linkedin authentication")
    return done(err, null);
  }
}
));

passport.serializeUser((user, done) => {
  console.log("serializing  user")
  done(null, user._id); // Serialize by user ID
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  console.log("Deserializing User")
try {
  const user = await linkedinuser.findById(id); // Find user by ID in DB
  done(null, user);
} catch (err) {
  done(err, null);
}
});

// LinkedIn Auth Routes
linkedinrouter.get('/',
passport.authenticate('linkedin'));

linkedinrouter.get('/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  async (req, res) => {
    // Successful authentication
    console.log("Callback route hit", req.query); 

    const user = req.user;

    // Generate JWT token for authenticated user
    const token = user.generateAuthToken();

    // Send token and user details back to client
    res.json({ message: 'Successfully authenticated with LinkedIn', token, user });
  }
);


module.exports = linkedinrouter;



// // Session config (for Passport)
// linkedinrouter.use(session({
//   secret: env,
//   resave: false,
//   saveUninitialized: true
// }));

// linkedinrouter.use(passport.initialize());
// linkedinrouter.use(passport.session());

// // Passport LinkedIn strategy
// passport.use(new LinkedInStrategy({
//     clientID: process.env.LINKEDIN_CLIENT_ID,
//     clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
//     callbackURL: "http://localhost:5000/auth/linkedin/callback",
//     scope: ['r_emailaddress', 'r_liteprofile'],
//     state: true
//   },
//   function(token, tokenSecret, profile, done) {
//     // Here you would typically save the profile to your database
//     return done(null, profile);
//   }
// ));

// // Serialize user
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// // Deserialize user
// passport.deserializeUser((obj, done) => {
//   done(null, obj);
// });

// // LinkedIn Auth Routes
// linkedinrouter.get('/auth/linkedin',
//   passport.authenticate('linkedin', { state: 'SOME STATE'  }));

// linkedinrouter.get('/auth/linkedin/callback', 
//   passport.authenticate('linkedin', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.json({ message: 'Successfully authenticated with LinkedIn', user: req.user });
//   }
// );

// app.listen(5000, () => {
//   console.log('Server running on http://localhost:5000');
// });
