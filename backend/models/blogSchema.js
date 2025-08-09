const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    enum: ['Technology', 'Travel', 'Food', 'Lifestyle', 'Business', 'Education', 'All'], // Align with your categories
    default: 'All',
  },
  image: {
    type: String, // URL to thumbnail image
    default: '',
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 200,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
