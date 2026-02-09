const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: Number,
});

blogSchema.set('toJSON', {
  virtuals: true,
  /* eslint-disable no-param-reassign */
  transform: (before, after) => {
    delete after._id;
    delete after.__v;
  },
  /* eslint-enable no-param-reassign */
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
