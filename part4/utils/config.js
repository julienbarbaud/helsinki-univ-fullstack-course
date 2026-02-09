require('dotenv').config();

const { PORT, ENV_TYPE } = process.env;
const MONGODB_URL = ENV_TYPE === 'test' ? process.env.MONGODB_TEST_URL : process.env.MONGODB_URL;

module.exports = {
  PORT,
  MONGODB_URL,
  ENV_TYPE,
};
