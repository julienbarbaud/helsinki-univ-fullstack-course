const mongoose = require('mongoose');
const { formatJson } = require('./helper');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    unique: true,
  },
  name: String,
  password: {
    type: String,
    required: true,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  }],
});

formatJson(userSchema);

const User = mongoose.model('User', userSchema);

module.exports = User;
