const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const blogsRouter = require('./controller/blogs');
const { unknownEndpoint, errorHandler } = require('./utils/middleware')

console.log(`Connecting to db at ${config.MONGODB_URL}`);
mongoose
  .connect(config.MONGODB_URL, { family: 4 })
  .then(() => console.log('connection successful'))
  .catch((error) => console.error('failed connection to db with error: ', error));

const app = express();
app.use(express.json());
app.use('/api/blogs', blogsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);


module.exports = app;
