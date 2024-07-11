const mongoose = require('mongoose');

const postTrashSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  pinned: { type: Boolean, default: false },
  deletedAt: {
    type: Date,
    default: Date.now,
  },
});

const PostTrash = mongoose.model('PostTrash', postTrashSchema);

module.exports = PostTrash;
