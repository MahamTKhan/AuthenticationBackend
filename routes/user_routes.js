const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user_controller.js');

userRouter.get('/getAll', userController.getAll);

userRouter.post('/add', userController.add);

module.exports = userRouter;