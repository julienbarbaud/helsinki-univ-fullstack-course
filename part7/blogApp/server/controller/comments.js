const commentsRouter = require("express").Router();
const Comment = require("../models/comment");

commentsRouter.get("/", async (_, response, next) => {
  try {
    const comments = await Comment.find({});
    response.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

module.exports = commentsRouter;
