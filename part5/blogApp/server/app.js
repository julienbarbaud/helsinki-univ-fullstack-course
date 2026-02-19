const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const blogsRouter = require('./controller/blogs');
const userRouter = require('./controller/users');
const loginRouter = require('./controller/login');
const testingRouter = require('./controller/testing');
const { unknownEndpoint, errorHandler, extractToken } = require('./utils/middleware');

console.log(`Connecting to db at ${config.MONGODB_URL}`);
mongoose
  .connect(config.MONGODB_URL, { family: 4 })
  .then(() => console.log('connection successful'))
  .catch((error) => console.error('failed connection to db with error: ', error));

const app = express();
app.use(express.json());
app.use(extractToken);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
if (process.env.ENV_TYPE === 'test') {
  app.use('/api/testing', testingRouter);
}

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
