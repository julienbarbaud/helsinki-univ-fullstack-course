const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { authenticateUser } = require('../utils/middleware');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('author', { username: 1, name: 1 });
    return response.json(blogs);
  } catch (error) {
    return next(error);
  }
});

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id).populate('author', { username: 1, name: 1 });
    return response.json(blog);
  } catch (error) {
    return next(error);
  }
});

blogsRouter.post('/', authenticateUser, async (request, response, next) => {
  try {
    const { body, user } = request;
    const newBlog = new Blog({
      ...body,
      author: user.id,
      likes: body.likes || 0,
    });
    const result = await new Blog(newBlog).save();
    await result.populate('author');

    // updating author information:
    user.posts = user.posts.concat(result._id);
    await user.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', authenticateUser, async (request, response, next) => {
  try {
    const toDelete = await Blog.findById(request.params.id);
    if (!toDelete) return response.status(400).json({ error: 'no blog with that id' });
    const { user } = request;
    if (!toDelete.author.equals(user._id)) {
      return response.status(401).json({ error: 'deletion is only possible if logged-in as the author' });
    }
    await toDelete.deleteOne();
    user.posts = user.posts.filter(({ _id }) => !_id.equals(toDelete.id));
    await user.save();
    return response.status(204).end();
  } catch (error) {
    return next(error);
  }
});

blogsRouter.put('/:id', authenticateUser, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (!blog) return response.status(400).json({ error: 'no blog with that id' });
    if (request.user.id.toString() !== blog.author.toString()) {
      return response.status(401).json({ error: 'updating is only possible if logged-in as the author' });
    }
    blog.set(request.body);
    const result = await blog.save();
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

module.exports = blogsRouter;
