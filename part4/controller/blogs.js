const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    return response.json(blogs);
  }
  catch (error) {
    next(error)
  }
});

blogsRouter.post('/', async (request, response, next) => {
  try{
    const { body } = request;
    const newBlog = new Blog({
      ...body,
      likes: body.likes || 0,
    })
    const result = await new Blog(newBlog).save();
    response.status(201).json(result);
  }
  catch (error) {
    console.log("catching error")
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    return response.status(204).end();
  }
  catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try{
    const blog = await Blog.findById(request.params.id);
    const { author, title, likes, url } = request.body;
    blog.author = author || blog.author;
    blog.title = title || blog.title;
    blog.likes = likes || blog.likes;
    blog.url = url || blog.url;
    const result = await blog.save();
    return response.status(200).json(result);
  }
  catch (error) {
    next(error)
  }
});

module.exports = blogsRouter;
