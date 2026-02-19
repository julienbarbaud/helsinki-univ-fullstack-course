const mongoose = require('mongoose');
const { formatJson } = require('./helper');

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  url: {
    type: String,
    required: true,
  },
  likes: Number,
});

formatJson(blogSchema);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
