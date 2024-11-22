const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user_controller.js');
const loginController = require('../controllers/Authorization_controllers/login_controller.js');
const signupController=require('../controllers/Authorization_controllers/signup_controller.js');
const forgotpasswordcontroller=require('../controllers/Password_controllers/forgotpassword_controller.js');
const resetpasswordcontroller=require('../controllers/Password_controllers/resetpassword_controller.js');
const {sendOTPEmail}=require('../controllers/OTP_controllers/sendOTP.js');
const verifyOTPcontroller=require('../controllers/OTP_controllers/verifyOTP.js');
const resendOTPcontroller=require('../controllers/OTP_controllers/resendOTP.js');
const linkedinrouter=require('../controllers/Authorization_controllers/Linkedin.js')
const users = require("../models/users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




userRouter.get('/getAll', userController.getAll);

userRouter.post('/add', userController.add);

userRouter.post('/login',loginController);

userRouter.post('/signup',signupController);
userRouter.post('/password/forgotpassword',forgotpasswordcontroller);
userRouter.post('/password/resetpassword',resetpasswordcontroller);

userRouter.post('/verify-OTP',verifyOTPcontroller);

userRouter.post('/resend-OTP',resendOTPcontroller);
console.log("calling linkedin route");
userRouter.use('/auth/linkedin', linkedinrouter);

module.exports = userRouter;