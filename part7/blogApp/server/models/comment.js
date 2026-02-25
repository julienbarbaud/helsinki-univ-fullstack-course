const mongoose = require("mongoose");
const { formatJson } = require("./helper");

const commentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
});

formatJson(commentSchema);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
