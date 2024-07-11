const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: false },
  pinnedCourse: { type: Boolean, default: false },
  price: { type: Number, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  shortDescription: { type: String, required: true },
  longDescription: { type: String, required: true },
});

module.exports = mongoose.model('Course', courseSchema);
