const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('./config');

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === 'CastError') {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === 'MongoServerError') {
    return response.status(400).json({ error: 'This username is already taken' });
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Authentication failed' });
  }
  return next(error);
};

const unknownEndpoint = (request, response) => response.status(404).json({ error: 'specified endpoint does not exist' });

const extractToken = (request, response, next) => {
  const auth = request.get('authorization');
  if (auth) {
    const [authType, token] = auth.split(' ');
    if (/Bearer/.test(authType)) request.token = token;
  }
  next();
};

const authenticateUser = async (request, response, next) => {
  try {
    const { id } = jwt.verify(request.token, JWT_SECRET);
    if (!id) {
      response.status(401).json({ error: 'invalid token' });
      return;
    }
    const user = await User.findById(id);
    if (!user) {
      response.status(400).json({ error: 'logged in user not found' });
      return;
    }
    request.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  extractToken,
  authenticateUser,
};
