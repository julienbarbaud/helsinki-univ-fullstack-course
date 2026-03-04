const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
  },
  born: Number,
});

module.exports = mongoose.model("author", authorSchema);
