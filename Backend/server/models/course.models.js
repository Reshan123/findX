const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: false },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Course', courseSchema);
