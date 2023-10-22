// courseModel.js
// Define the Course model

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

module.exports = mongoose.model('Course', courseSchema);
