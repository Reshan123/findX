const mongoose = require('mongoose');

const courseTrashSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  deletedAt: {
    type: Date,
    default: Date.now,
  },
});

const CourseTrash = mongoose.model('CourseTrash', courseTrashSchema);

module.exports = CourseTrash;
