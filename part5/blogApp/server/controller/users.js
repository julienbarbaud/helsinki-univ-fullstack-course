const { Router } = require('express');
const { hash } = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user');
const config = require('../utils/config');
const { userPasswordIsValid } = require('../models/modelValidation');

const userRouter = Router();

userRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).select('-password').populate('posts', { title: 1, url: 1 });
    return response.status(200).json(users);
  } catch (error) {
    return next(error);
  }
});

userRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body;
    if (!username || !password) return response.status(400).json({ error: 'username and password are required' });
    if (!userPasswordIsValid(password)) throw new mongoose.Error.ValidationError({ message: 'invalid password' });
    const hashedPwd = await hash(password, config.CRYPTO_SALT_ROUNDS);
    const newUser = new User({
      username,
      name,
      password: hashedPwd,
    });
    const result = await newUser.save();
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

module.exports = userRouter;
