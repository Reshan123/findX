const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseContentSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  youtubeLink: { type: String, required: true },
  file: { type: String, required:false }, // Storing the file path
}, {
  timestamps: true,
});

module.exports = mongoose.model('CourseContent', courseContentSchema);
