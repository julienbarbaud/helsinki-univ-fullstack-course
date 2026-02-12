require('dotenv').config();

const { PORT, ENV_TYPE, JWT_SECRET } = process.env;
const MONGODB_URL = ENV_TYPE === 'test' ? process.env.MONGODB_TEST_URL : process.env.MONGODB_URL;
const CRYPTO_SALT_ROUNDS = 5;

module.exports = {
  PORT,
  MONGODB_URL,
  ENV_TYPE,
  CRYPTO_SALT_ROUNDS,
  JWT_SECRET,
};
