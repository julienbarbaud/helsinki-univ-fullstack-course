const loginRouter = require('express').Router();
const { compare } = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../utils/config');

loginRouter.post('/', async (request, response, next) => {
  try {
    const { username, password } = request.body;
    console.log(username, password);
    if ((!username) || (!password)) return response.status(400).json({ error: 'username and password are required' });
    const [user] = await User.find({ username });
    if (!user) return response.status(401).json({ error: 'username does not exist' });
    const passwordIsRight = await compare(password, user.password);
    if (!passwordIsRight) return response.status(401).json({ error: 'password is incorrect' });
    const userToken = {
      id: user.id,
      username,
    };
    const token = jwt.sign(userToken, config.JWT_SECRET);
    return response.status(200).json({ token, ...user.toObject() });
  } catch (error) {
    return next(error);
  }
});

module.exports = loginRouter;
